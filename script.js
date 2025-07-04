// Variáveis globais para armazenar dados do time atual
let projetos = [];
let commentTemplates = {};
let descriptionTemplates = {};
let templateGuidelines = {};
let templates = {};
let currentTeam = "HCMCOL"; // Time padrão ao iniciar

// Função para carregar os dados do time selecionado
async function loadTeamData() {
  const team = document.getElementById("teamSelect").value;
  currentTeam = team;
  
  try {
    // Carrega o arquivo JSON do time selecionado
    const response = await fetch(`${team}/data.json`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar dados do time: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Atualiza as variáveis globais com os dados do time
    projetos = data.projetos || [];
    commentTemplates = data.commentTemplates || {};
    descriptionTemplates = data.descriptionTemplates || {};
    templateGuidelines = data.templateGuidelines || {};
    
    // Processa referências especiais nos templates (como @projetos)
    processTemplateReferences(commentTemplates);
    processTemplateReferences(descriptionTemplates);
    
    // Atualiza as menções com base no time selecionado
    updateMentions(data.mentions || []);
    
    // Atualiza os templates e o formulário
    templates = commentTemplates; // Define template padrão como comentários
    updateTemplateOptions();

  } catch (error) {
    console.error("Erro ao carregar dados do time:", error);
    alert(`Não foi possível carregar os dados do time ${team}. Erro: ${error.message}`);
  }
}

// Função para processar referências especiais nos templates
function processTemplateReferences(templatesObj) {
  for (const templateType in templatesObj) {
    templatesObj[templateType].forEach(field => {
      // Substitui referência @projetos pela lista de projetos
      if (field.options === "@projetos") {
        field.options = projetos;
      }
    });
  }
}

// Função para atualizar a lista de menções
function updateMentions(mentionsList) {
  const mentionsContainer = document.getElementById("mentions");
  mentionsContainer.innerHTML = "";

  mentionsList.forEach(mention => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${mention.value}"> ${mention.name}`;
    mentionsContainer.appendChild(label);
  });
}

// Função para atualizar os tipos de templates disponíveis com base na categoria selecionada
function updateTemplateOptions() {
  const category = document.getElementById("templateCategory").value;
  const typeSelect = document.getElementById("type");
  typeSelect.innerHTML = "";
  
  // Atualizar referência para os templates ativos
  templates = category === "comment" ? commentTemplates : descriptionTemplates;
  
  // Atualizar o seletor de tipos com as opções correspondentes
  Object.keys(templates).forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = getTemplateDisplayName(type);
    typeSelect.appendChild(option);
  });
  
  // Atualizar visibilidade da seção de menções
  document.getElementById("mentionsSection").style.display = 
    category === "comment" ? "block" : "none";
  
  // Atualizar formulário com o primeiro tipo da categoria
  updateForm();
}

// Função para obter o nome de exibição de um tipo de template
function getTemplateDisplayName(type) {
  const displayNames = {
    review_tests: "Testes Aprovados",
    review_rejected: "Testes Reprovados",
    code_ready: "Código Pronto",
    code_review_approved: "Code Review Aprovado",
    code_review_rejected: "Code Review Rejeitado",
    rework: "Rework Changed",
    doc: "Documentação",
    task_generic: "Tarefa Genérica",
    user_story: "Story de Usuário",
    bug: "BUG ou Subtask",
    bug_checklist: "Bug(interno ou de mercado)",
    subtask_programming_checklist: "Subtask de Programação",
    story_checklist: "Story (quando não há subtasks)",
    code_reviewer_checklist: "Code Reviewer Checklist",
    qa_testing_checklist: "QA",
    bugfix_template: "Abertura de Bug",
    analysis_task_template: "Abertura de Subtask",
    test_case_template: "Test Case",
    evidencia_testes_template: "Evidência de Testes",
    analise_critica_template: "Análise Crítica e de Impacto",
    classificacao_retrabalho_template: "Classificação de Retrabalho"
  };
  
  return displayNames[type] || type;
}

// Função para validar se todos os campos obrigatórios foram preenchidos
function validateFields() {
  const type = document.getElementById("type").value;
  const templateFields = templates[type] || [];
  let isValid = true;
  let firstInvalidField = null;

  // Remover mensagens de erro anteriores
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  templateFields.forEach(field => {
    if (field.readonly) return; // Campos somente leitura não precisam de validação

    if (field.type === "textarea" || field.type === "text") {
      const input = document.getElementById(field.id);
      if (!input.value.trim()) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = input;

        // Adicionar mensagem de erro e estilo
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Campo obrigatório";
        input.classList.add("invalid-field");
        input.parentNode.appendChild(errorMsg);
      } else {
        input.classList.remove("invalid-field");
      }
    } else if (field.type === "boolean") {
      const checked = document.querySelector(`input[name='${field.id}']:checked`);
      if (!checked) {
        isValid = false;
        const radioGroup = document.querySelector(`.radio-options[name='${field.id}']`) ||
                          document.querySelector(`.radio-options`);
        if (!firstInvalidField && radioGroup) firstInvalidField = radioGroup;

        // Adicionar mensagem de erro
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Selecione uma opção";
        const container = document.querySelector(`input[name='${field.id}']`).closest('.boolean-group');
        container.appendChild(errorMsg);
      }
    } else if (field.type === "env") {
      const envChecked = document.querySelector('.env-branch input[type=checkbox]:checked');
      if (!envChecked) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = document.querySelector('.env-branch');

        // Adicionar mensagem de erro
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Selecione pelo menos um ambiente";
        const container = document.querySelector('.env-branch').closest('.field-container');
        container.appendChild(errorMsg);
      } else {
        // Verificar se todos os ambientes selecionados têm branch informada
        document.querySelectorAll('.env-branch input[type=checkbox]:checked').forEach(checkbox => {
          const input = checkbox.parentElement.nextElementSibling;
          if (!input.value.trim()) {
            isValid = false;
            if (!firstInvalidField) firstInvalidField = input;

            input.classList.add("invalid-field");
            // Adicionar mensagem de erro
            const errorMsg = document.createElement("div");
            errorMsg.className = "error-message";
            errorMsg.textContent = "Informe a branch";
            input.parentNode.appendChild(errorMsg);
          } else {
            input.classList.remove("invalid-field");
          }
        });
      }
    } else if (field.type === "checkbox" && field.options) {
      const checked = document.querySelector(`input[name='${field.id}']:checked`);
      if (!checked) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = document.querySelector(`input[name='${field.id}']`);

        // Adicionar mensagem de erro
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Selecione pelo menos uma opção";
        const container = document.querySelector(`input[name='${field.id}']`).closest('.field-container');
        container.appendChild(errorMsg);
      }
    }
  });

  // Rolar até o primeiro campo inválido
  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalidField.focus();
  }

  return isValid;
}

// Função para preencher campo com N/A
function fillWithNA(fieldId) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.value = "N/A";
    input.classList.remove("invalid-field");
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
  }
}

// Função para atualizar o formulário com base no tipo selecionado
function updateForm() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("templateCategory").value;
  const container = document.getElementById("dynamicFields");
  container.innerHTML = "";
  
  // Limpar o output quando alterar o template
  document.getElementById("output").innerText = "";

  // Atualizar a exibição das orientações de uso (guidelines)
  updateGuidelines(type, category);

  const templateFields = templates[type] || [];

  templateFields.forEach(field => {
    // Pular os campos de painéis e informações sobre quando preencher
    if (field.id === "panel_start" || field.id === "panel_end" || 
        (field.defaultValue && field.defaultValue.includes("{panel")) ||
        (field.defaultValue && field.defaultValue.includes("*Quando deve ser preenchido:*"))) {
      return; // Não exibe esses campos no formulário
    }

    // Pular os campos que contêm cabeçalhos com formatação de cor
    if (field.defaultValue && field.defaultValue.includes("{color:")) {
      return; // Não exibe esses campos no formulário
    }
    
    // Converter links em formato Jira [texto|url] em links HTML clicáveis
    const labelWithLinks = field.label ? convertJiraLinks(field.label) : '';

    if (field.type === "textarea") {
      const div = document.createElement("div");
      div.className = "field-container";
      div.innerHTML = `<div class="label-container">
                        <label for="${field.id}">${labelWithLinks}</label>
                        ${field.readonly ? '' : '<button type="button" class="na-button" onclick="fillWithNA(\'' + field.id + '\')">N/A</button>'}
                      </div>
                      <textarea id="${field.id}" ${field.readonly ? 'readonly' : ''}>${field.defaultValue || ''}</textarea>`;
      container.appendChild(div);
    }
    else if (field.type === "text") {
      const div = document.createElement("div");
      div.className = "field-container";
      div.innerHTML = `<div class="label-container">
                        <label for="${field.id}">${labelWithLinks}</label>
                        ${field.readonly ? '' : '<button type="button" class="na-button" onclick="fillWithNA(\'' + field.id + '\')">N/A</button>'}
                      </div>
                      <input type="text" id="${field.id}" ${field.readonly ? 'readonly' : ''} value="${field.defaultValue || ''}">`;
      container.appendChild(div);
    }
    else if (field.type === "boolean") {
      const div = document.createElement("div");
      div.className = "boolean-group";
      div.innerHTML = `<label>${labelWithLinks}</label>
                      <div class="radio-options" name="${field.id}">
                        <label><input type="radio" name="${field.id}" value="Sim"> Sim</label>
                        <label><input type="radio" name="${field.id}" value="Não"> Não</label>
                      </div>`;
      container.appendChild(div);
    }
    else if (field.type === "checkbox" && field.options) {
      const div = document.createElement("div");
      div.className = "field-container";
      let checkboxHTML = `<label>${labelWithLinks}</label><div class="checkbox-list">`;

      field.options.forEach(option => {
        checkboxHTML += `<label><input type="checkbox" name="${field.id}" value="${option}"> ${option}</label>`;
      });

      checkboxHTML += `</div>`;
      div.innerHTML = checkboxHTML;
      container.appendChild(div);
    }
    else if (field.type === "env") {
      const div = document.createElement("div");
      div.className = "field-container";
      div.innerHTML = `<label>${labelWithLinks}</label>`;

      projetos.forEach(projeto => {
        const envDiv = document.createElement("div");
        envDiv.className = "env-branch";
        envDiv.innerHTML = `
          <label><input type="checkbox" onchange="toggleBranchInput(this)"> ${projeto}</label>
          <input type="text" placeholder="Branch" disabled>
        `;
        div.appendChild(envDiv);
      });

      container.appendChild(div);
    }
  });
}

// Função para atualizar as orientações de uso (guidelines) na interface
function updateGuidelines(type, category) {
  const guidelinesSection = document.getElementById("guidelinesSection");
  const guidelinesContent = document.getElementById("guidelinesContent");
  
  // Se existirem guidelines para o tipo selecionado (seja descrição ou comentário)
  if (templateGuidelines && templateGuidelines[type]) {
    const guidelines = templateGuidelines[type];

    // Montar HTML com as orientações
    let guidelinesHTML = `
      <p><strong>Status onde ação deve ocorrer:</strong> ${guidelines.status}</p>
      <p><strong>Autor:</strong> ${guidelines.autor}</p>
      <p><strong>Flegar task?:</strong> ${guidelines.flegar}</p>
      <p><strong>Mudar Responsável?:</strong> ${guidelines.mudarResponsavel}</p>
      <p><strong>Responsável:</strong> ${guidelines.responsavel}</p>
      <p><strong>Enviar para:</strong> ${guidelines.enviarPara}</p>
      <p><strong>Pessoas que devo marcar:</strong> ${guidelines.marcarPessoas}</p>
    `;

    guidelinesContent.innerHTML = guidelinesHTML;
    guidelinesSection.style.display = "block";
  } else {
    // Esconder seção se não houver guidelines
    guidelinesSection.style.display = "none";
  }
}

// Função para habilitar/desabilitar o campo de branch
function toggleBranchInput(checkbox) {
  const input = checkbox.parentElement.nextElementSibling;
  input.disabled = !checkbox.checked;
  if (checkbox.checked) {
    input.focus();
  }
}

// Função para gerar o output formatado para o Jira
function generateOutput() {
  // Validar os campos antes de gerar o output
  if (!validateFields()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const category = document.getElementById("templateCategory").value;
  const type = document.getElementById("type").value;
  const mentions = Array.from(document.querySelectorAll('#mentions input:checked'))
    .map(cb => cb.value)
    .join(', ');

  let output = "";
  
  // Templates de comentários
  if (category === "comment") {
    // Primeira parte do output baseada no tipo de template
    switch (type) {
      case "review_tests":
        output = `*{color:#14892c}#REVIEW_APPROVED{color}*\n`;
        break;
      case "review_rejected":
        output = `*{color:red}#REWORK_REVIEW{color}*\n`;
        break;
      case "code_ready":
        output = `*{color:blue}#CODE_READY*{color}\n`;
        break;
      case "code_review_approved":
        output = `*{color:#8eb021}#CODE_REVIEW_APPROVED{color}*\n`;
        break;
      case "code_review_rejected":
        output = `*{color:orange}#CODE_REVIEW_CHANGED{color}*\n`;
        break;
      case "rework":
        output = `*{color:#f6c342}#REWORK_CHANGED{color}*\n`;
        break;
      case "doc":
        output = `h2. Documentação\n`;
        break;
    }

    // Adicionar menções se houver
    if (mentions) {
      output += `*To:* ${mentions}\n\n`;
    }

    // Processar os diferentes tipos de templates de comentário
    if (type === "review_tests") {
      // Pular o cabeçalho que já foi adicionado
      const testes = document.getElementById('testes')?.value || '';
      const config = document.getElementById('config')?.value || '';
      const conclusao = document.getElementById('conclusao')?.value || '';

      output += `h5. *Testes Realizados:*\n${testes}\n\n`;
      output += `h5. *Ambientes de Teste:*\n`;

      // Adicionar ambientes selecionados com suas branches
      document.querySelectorAll('.env-branch').forEach(div => {
        const checkbox = div.querySelector('input[type=checkbox]');
        const input = div.querySelector('input[type=text]');
        if (checkbox.checked) {
          output += `* ${checkbox.parentElement.innerText.trim()} - Branch: ${input.value}\n`;
        }
      });

      output += `\nh5. *Configurações de Ambiente:*\n${config}\n\n`;
      output += `h5. *Conclusão:*\n${conclusao}`;
    }
    else if (type === "code_ready") {
      const templateFields = templates[type] || [];
      templateFields.forEach((field, index) => {
        if (index === 0) return; // Pular o cabeçalho que já foi adicionado

        if (field.type === "boolean") {
          const value = document.querySelector(`input[name='${field.id}']:checked`)?.value;
          if (value) {
            output += `*${field.label}*\n(${value === 'Sim' ? '/' : 'x'}) ${value}\n\n`;
          }
        }
        else if (field.type === "checkbox") {
          output += `*${field.label}*\n`;
          const checked = Array.from(document.querySelectorAll(`input[name='${field.id}']:checked`))
            .map(cb => `* ${cb.value}`)
            .join('\n');
          output += checked ? checked + '\n\n' : 'Nenhum\n\n';
        }
        else {
          const value = document.getElementById(field.id)?.value;
          output += `*${field.label}*\n${value || ''}\n\n`;
        }
      });
    }
    else if (type === "code_review_approved") {
      const templateFields = templates[type] || [];
      templateFields.forEach((field, index) => {
        if (index === 0) return; // Pular o cabeçalho que já foi adicionado

        if (field.type === "boolean") {
          const value = document.querySelector(`input[name='${field.id}']:checked`)?.value;
          if (value) {
            output += `*${field.label}*\n(${value === 'Sim' ? '/' : 'x'}) ${value}\n\n`;
          }
        } else {
          const value = document.getElementById(field.id)?.value;
          output += `*${field.label}*\n${value || ''}\n\n`;
        }
      });

      output += `\n*APPROVED* (/)`;
    }
    else if (type === "code_review_rejected") {
      output += `(Evidenciar de forma breve que o code review foi finalizado)\n\n`;
      output += `_*Link dos MR's que necessitam de alteração:*_\n${document.getElementById('mrs')?.value || ''}`;
    }
    else if (type === "rework") {
      output += document.getElementById('info')?.value || '';
    }
    else if (type === "doc") {
      const templateFields = templates[type] || [];
      templateFields.forEach(field => {
        const value = document.getElementById(field.id)?.value || '';
        output += `*${field.label}*\n${value}\n\n`;
      });
    }
    else if (type === "review_rejected") {
      output += `*Motivo da reprovação:*\n${document.getElementById('motivo')?.value || ''}`;
    }
    else if (type === "bug_checklist" || type === "subtask_programming_checklist" || type === "story_checklist" || 
             type === "code_reviewer_checklist" || type === "qa_testing_checklist" || 
             type === "bugfix_template" || type === "analysis_task_template" || 
             type === "test_case_template" || type === "evidencia_testes_template" ||
             type === "analise_critica_template" || type === "classificacao_retrabalho_template") {
      // Processa templates de checklists
      const templateFields = templates[type] || [];
      
      // Adiciona o painel inicial se existir
      const panelStart = templateFields.find(field => field.id === "panel_start");
      if (panelStart && panelStart.defaultValue) {
        output += `${panelStart.defaultValue}\n\n`;
      }
      
      // Processa os campos do formulário
      templateFields.forEach(field => {
        // Pula os campos panel_start e panel_end, pois são processados separadamente
        if (field.id === "panel_start" || field.id === "panel_end") {
          return;
        }
        
        if (field.type === "boolean") {
          const value = document.querySelector(`input[name='${field.id}']:checked`)?.value;
          if (value) {
            output += `${field.label}\n(${value === 'Sim' ? '/' : 'x'}) ${value}\n\n`;
          }
        } 
        else if (field.type === "textarea" && field.readonly) {
          if (field.defaultValue) {
            output += `${field.defaultValue}\n\n`;
          }
        }
        else if (field.id && !field.readonly) {
          const value = document.getElementById(field.id)?.value || '';
          if (field.label) {
            output += `${field.label}\n${value}\n\n`;
          } else {
            output += `${value}\n\n`;
          }
        }
      });

      // Adiciona o painel final se existir
      const panelEnd = templateFields.find(field => field.id === "panel_end");
      if (panelEnd && panelEnd.defaultValue) {
        output += `${panelEnd.defaultValue}`;
      }
    }
  }
  // Templates de descrição de tarefa
  else {
    if (type === "task_generic") {
      const templateFields = templates[type] || [];
      templateFields.forEach(field => {
        const value = document.getElementById(field.id)?.value || '';
        output += `*${field.label}*\n${value || field.placeholder || ''}\n\n`;
      });
    }
    else if (type === "user_story") {
      const regrasNegocio = document.getElementById('regra_negocio')?.value || '';
      const como = document.getElementById('como')?.value || '';
      const quero = document.getElementById('quero')?.value || '';
      const para = document.getElementById('para')?.value || '';
      const dado = document.getElementById('dado')?.value || '';
      const quando = document.getElementById('quando')?.value || '';
      const entao = document.getElementById('entao')?.value || '';
      
      output += `{panel:title=Regra de negócio (i)}\n${regrasNegocio}\n{panel}\n\n`;
      output += `{panel:title=User story (y)}\n\n*Como* ${como}\n\n*Quero* ${quero}\n\n*Para* ${para}\n\n{panel}\n\n`;
      output += `{panel:title=Critério de aceite (/)}\n\n*Dado* ${dado}\n\n*Quando* ${quando}\n\n*Então* ${entao}\n\n{panel}\n`;
    }
    else if (type === "bug") {
      const descricao = document.getElementById('descricao')?.value || '';
      const artefatos = document.getElementById('artefatos')?.value || '';
      const criterios = document.getElementById('criterios')?.value || '';
      const orientacoes = document.getElementById('orientacoes')?.value || '';
      const criador = document.getElementById('criador')?.value || '';
      const atualizador = document.getElementById('atualizador')?.value || '';
      const data = document.getElementById('data')?.value || '';
      
      output += `{color:red}*DESCRIÇÃO*{color}\n${descricao}\n\n`;
      output += `{color:red}*ARTEFATOS*{color}\n\n- Projeto: ${artefatos}\n\n`;
      output += `{color:red}*CRITÉRIOS DE ACEITE*{color}\n${criterios}\n\n`;
      output += `{color:red}*ORIENTAÇÕES TÉCNICAS*{color}\n\n(i) ${orientacoes || 'Nenhuma'}\n\n{panel}\n\n`;
      output += `*Criado por:* ${criador}\n\n`;
      output += `*Atualizado por:* ${atualizador}\n\n`;
      output += `*Data:* ${data}\n\n{panel}\n`;
    }

    // Adicionar orientações de uso abaixo do output
    if (templateGuidelines[type]) {
      const guidelines = templateGuidelines[type];
      output += `\n\n--------------------\n`;
      output += `*Orientações de uso:*\n`;
      output += `- Status onde ação deve ocorrer: ${guidelines.status}\n`;
      output += `- Autor: ${guidelines.autor}\n`;
      output += `- Flegar task?: ${guidelines.flegar}\n`;
      output += `- Mudar Responsável?: ${guidelines.mudarResponsavel}\n`;
      output += `- Responsável: ${guidelines.responsavel}\n`;
      output += `- Enviar para: ${guidelines.enviarPara}\n`;
      output += `- Pessoas que devo marcar: ${guidelines.marcarPessoas}\n`;
    }
  }

  document.getElementById("output").innerText = output;
}

// Função para copiar o texto para a área de transferência
function copyOutput() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output)
    .then(() => {
      alert("Texto copiado com sucesso!");
    })
    .catch(err => {
      console.error('Erro ao copiar texto: ', err);
      alert("Não foi possível copiar o texto. Por favor, copie manualmente.");
    });
}

// Função para converter links no formato Jira [texto|url] em links HTML <a>
function convertJiraLinks(text) {
  if (!text) return text;
  // Regex para encontrar links no formato [texto|url]
  return text.replace(/\[(.*?)\|(.*?)\]/g, '<a href="$2" target="_blank">$1</a>');
}

// Inicializa a página quando carregar
document.addEventListener("DOMContentLoaded", async () => {
  await loadTeamData(); // Carrega os dados do time padrão
});

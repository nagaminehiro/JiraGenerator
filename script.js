// Configuração dos projetos e ambientes
const projetos = [
  "onboarding-backend",
  "onboarding-frontend",
  "onboarding-frontend-employee",
  "digital-hiring-bridge",
  "digital-hiring-candidate",
  "digital-hiring-ocr",
  "digital-hiring-processor",
  "digital-hiring-recruiter"
];

// Definição dos templates de comentários
const commentTemplates = {
  review_tests: [
    { label: "*{color:#14892c}#REVIEW_APPROVED{color}*", id: "rev_header", type: "textarea", readonly: true, defaultValue: "*{color:#14892c}#REVIEW_APPROVED{color}*" },
    { label: "Testes Realizados:", id: "testes", type: "textarea" },
    { label: "Ambientes de Teste:", id: "ambientes", type: "env" },
    { label: "Configurações de Ambiente:", id: "config", type: "textarea" },
    { label: "Conclusão:", id: "conclusao", type: "textarea" }
  ],
  review_rejected: [
    { label: "*{color:red}#REWORK_REVIEW{color}*", id: "header", type: "textarea", readonly: true, defaultValue: "*{color:red}#REWORK_REVIEW{color}*" },
    { label: "Motivo da reprovação:", id: "motivo", type: "textarea" }
  ],
  code_ready: [
    { label: "*{color:blue}#CODE_READY*{color}", id: "header", type: "textarea", readonly: true, defaultValue: "*{color:blue}#CODE_READY*{color}" },
    { label: "O que foi alterado/implementado no produto?", id: "alteracoes", type: "textarea" },
    { label: "Por que foi feito?", id: "motivo", type: "textarea" },
    { label: "Alguma API pública foi alterada ou criada?", id: "api", type: "boolean" },
    { label: "Houve inclusão/alteração/exclusão de campos?", id: "campos", type: "textarea" },
    { label: "Quais microserviços foram alterados?", id: "microservicos", type: "checkbox", options: projetos },
    { label: "Rotinas especiais impactadas?", id: "rotinas", type: "textarea" },
    { label: "Gerou alguma conversão/atualização de base?", id: "base", type: "textarea" },
    { label: "Necessita ajuste de documentação?", id: "doc", type: "textarea" },
    { label: "Como testar?", id: "testar", type: "textarea" }
  ],
  code_review_approved: [
    { label: "*{color:#8eb021}#CODE_REVIEW_APPROVED{color}*", id: "header", type: "textarea", readonly: true, defaultValue: "*{color:#8eb021}#CODE_REVIEW_APPROVED{color}*" },
    { label: "Todos os apontamentos do SonarQube foram corrigidos?", id: "sonar", type: "boolean" },
    { label: "Link do relatório do SonarQube", id: "sonar_link", type: "text" },
    { label: "Todos os MRs foram aprovados no GitLab?", id: "mr_aprovados", type: "boolean" },
    { label: "Você registrou as horas corretamente?", id: "horas", type: "boolean" }
  ],
  code_review_rejected: [
    { label: "*{color:orange}#CODE_REVIEW_CHANGED{color}*", id: "header", type: "textarea", readonly: true, defaultValue: "*{color:orange}#CODE_REVIEW_CHANGED{color}*" },
    { label: "Link dos MRs que necessitam alteração:", id: "mrs", type: "textarea" }
  ],
  rework: [
    { label: "*{color:#f6c342}#REWORK_CHANGED{color}*", id: "header", type: "textarea", readonly: true, defaultValue: "*{color:#f6c342}#REWORK_CHANGED{color}*" },
    { label: "Informações importantes sobre a correção", id: "info", type: "textarea" }
  ],
  doc: [
    { label: "1 — O que foi alterado/implementado no sistema?", id: "q1", type: "textarea" },
    { label: "1.1 — Houve alguma alteração ou criação de web service?", id: "q11", type: "textarea" },
    { label: "2 — Por que esta alteração/implementação foi realizada?", id: "q2", type: "textarea" },
    { label: "3 — Qual o local alterado/impactado?", id: "q3", type: "textarea" },
    { label: "4 — Documentação de processo", id: "q4", type: "textarea" },
    { label: "5 — Documentação técnica", id: "q5", type: "textarea" },
    { label: "6 — Inserir prints", id: "q6", type: "textarea" },
    { label: "7 — O que deve ser divulgado no Notas da Versão?", id: "q7", type: "textarea" },
    { label: "8 — Esta entrega também é válida para outras versões do sistema?", id: "q8", type: "textarea" }
  ]
};

// Definição dos templates para descrição de tarefas
const descriptionTemplates = {
  task_generic: [
    { label: "Resumo", id: "resumo", type: "textarea", placeholder: "Descrever o resumo do que se trata a task" },
    { label: "Descrição do que precisa ser feito?", id: "descricao", type: "textarea", placeholder: "Descrever o que precisa ser feito ou corrigido" },
    { label: "Porque deve ser feito?", id: "motivo", type: "textarea", placeholder: "Descrever o porque é necessário esta (implementação, correção ou refatoração)" },
    { label: "Quais rotinas(funcionalidades/telas/métodos e eventos) são ou podem ser passadas?", id: "rotinas", type: "textarea", placeholder: "Descrever quais rotinas métodos telas são impactadas, se a liberação do back depende do front ou etc" },
    { label: "Deve se avaliar integrações(GDP, Recruta, Administração de pessoal, GED, Externos)?", id: "integracoes", type: "textarea", placeholder: "Descrever se será necessário considerar integrações e quais devem ser consideradas" },
    { label: "O recurso implementado ou corrigido deve ser incluido ou corrigido na API de integração?", id: "api_integracao", type: "textarea", placeholder: "Descrever se deve ser levado em consideração a api de integração publica" },
    { label: "Será necessário inclusão de campos na visão dinamica?", id: "visao_dinamica", type: "textarea", placeholder: "Descrever se será necessário inclusão de campos na visão dinamica, ou criação de novas views" },
    { label: "Critérios de aceite", id: "criterios", type: "textarea", placeholder: "Descrever o que precisa ser entregue" }
  ],
  user_story: [
    { label: "Regra de negócio", id: "regra_negocio", type: "textarea", placeholder: "Descreva as regras de negócio relevantes para esta história" },
    { label: "Como", id: "como", type: "textarea", placeholder: "Descreva o papel do usuário (Ex: Como um cliente do sistema...)" },
    { label: "Quero", id: "quero", type: "textarea", placeholder: "Descreva o que o usuário quer fazer (Ex: Quero poder visualizar meu histórico de compras...)" },
    { label: "Para", id: "para", type: "textarea", placeholder: "Descreva o benefício (Ex: Para poder acompanhar meus gastos mensais...)" },
    { label: "Critério de aceite - Dado", id: "dado", type: "textarea", placeholder: "Condições pré-existentes (Ex: Dado que estou logado no sistema...)" },
    { label: "Critério de aceite - Quando", id: "quando", type: "textarea", placeholder: "Ação realizada (Ex: Quando eu acesso a seção de histórico...)" },
    { label: "Critério de aceite - Então", id: "entao", type: "textarea", placeholder: "Resultado esperado (Ex: Então devo visualizar uma lista com todas minhas compras...)" }
  ],
  bug: [
    { label: "Descrição", id: "descricao", type: "textarea", placeholder: "Descreva detalhadamente o bug encontrado" },
    { label: "Artefatos", id: "artefatos", type: "textarea", placeholder: "Indique os projetos/sistemas afetados" },
    { label: "Critérios de Aceite", id: "criterios", type: "textarea", placeholder: "O que deve ser feito para considerar o bug resolvido" },
    { label: "Orientações Técnicas", id: "orientacoes", type: "textarea", placeholder: "Observações técnicas relevantes para a resolução" },
    { label: "Criado por", id: "criador", type: "text", placeholder: "Nome do criador" },
    { label: "Atualizado por", id: "atualizador", type: "text", placeholder: "Nome do último atualizador" },
    { label: "Data", id: "data", type: "text", placeholder: "00/00/0000" }
  ]
};

// Orientações de uso para cada tipo de template
const templateGuidelines = {
  task_generic: {
    status: "Backlog",
    autor: "DEVELOPER",
    flegar: "false",
    mudarResponsavel: "Não",
    responsavel: "UNASSIGNED",
    enviarPara: "__",
    marcarPessoas: "Não precisa marcar ninguém"
  },
  user_story: {
    status: "Backlog",
    autor: "PRODUCT OWNER, SYSTEM ANALYST",
    flegar: "false",
    mudarResponsavel: "Não",
    responsavel: "UNASSIGNED",
    enviarPara: "__",
    marcarPessoas: "Não precisa marcar ninguém"
  },
  bug: {
    status: "Backlog",
    autor: "DEVELOPER",
    flegar: "false",
    mudarResponsavel: "Não",
    responsavel: "UNASSIGNED",
    enviarPara: "__",
    marcarPessoas: "Não precisa marcar ninguém"
  }
};

// Referência para templates ativos baseado na categoria selecionada
let templates = commentTemplates;

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
    bug: "BUG ou Subtask"
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
  const container = document.getElementById("dynamicFields");
  container.innerHTML = "";
  
  // Limpar o output quando alterar o template
  document.getElementById("output").innerText = "";

  const templateFields = templates[type] || [];

  templateFields.forEach(field => {
    if (field.type === "textarea") {
      const div = document.createElement("div");
      div.className = "field-container";
      div.innerHTML = `<label for="${field.id}">${field.label}</label>
                      <div class="input-with-buttons">
                        <textarea id="${field.id}" ${field.readonly ? 'readonly' : ''}>${field.defaultValue || ''}</textarea>
                        ${field.readonly ? '' : '<button type="button" class="na-button" onclick="fillWithNA(\'' + field.id + '\')">N/A</button>'}
                      </div>`;
      container.appendChild(div);
    }
    else if (field.type === "text") {
      const div = document.createElement("div");
      div.className = "field-container";
      div.innerHTML = `<label for="${field.id}">${field.label}</label>
                      <div class="input-with-buttons">
                        <input type="text" id="${field.id}" ${field.readonly ? 'readonly' : ''} value="${field.defaultValue || ''}">
                        ${field.readonly ? '' : '<button type="button" class="na-button" onclick="fillWithNA(\'' + field.id + '\')">N/A</button>'}
                      </div>`;
      container.appendChild(div);
    }
    else if (field.type === "boolean") {
      const div = document.createElement("div");
      div.className = "boolean-group";
      div.innerHTML = `<label>${field.label}</label>
                      <div class="radio-options" name="${field.id}">
                        <label><input type="radio" name="${field.id}" value="Sim"> Sim</label>
                        <label><input type="radio" name="${field.id}" value="Não"> Não</label>
                      </div>`;
      container.appendChild(div);
    }
    else if (field.type === "checkbox" && field.options) {
      const div = document.createElement("div");
      div.className = "field-container";
      let checkboxHTML = `<label>${field.label}</label><div class="checkbox-list">`;

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
      div.innerHTML = `<label>${field.label}</label>`;

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

      output += `\n*APPROVED* ()`;
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

// Inicializa a página quando carregar
document.addEventListener("DOMContentLoaded", () => {
  updateTemplateOptions(); // Inicializa os tipos de templates com base na categoria padrão
});

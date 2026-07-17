# Definir o contrato de saída Markdown

Type: grilling
Status: resolved

## Question

Qual dialeto de Markdown e quais regras de compatibilidade serão suportados para títulos, listas, checklists, links, menções, blocos informativos, escaping e quebras de linha?

## Comments

- O documento Markdown bruto deve ser atualizado em tempo real, renderizado ao lado do formulário e copiado para a área de transferência por um botão dedicado.

## Answer

O contrato canônico será **Markdown compatível com Azure DevOps**, usando o núcleo comum e extensões GFM que a documentação oficial declara suportadas. A aplicação não produzirá mais Jira Wiki Markup.

- Cada template armazenará somente a estrutura Markdown; HTML não será mantido manualmente nos arquivos de template.
- O gerador produzirá simultaneamente o Markdown bruto e uma representação HTML sanitizada equivalente.
- A pré-visualização em tempo real renderizará essa representação HTML.
- O botão de cópia publicará `text/plain` com Markdown e `text/html` com o conteúdo renderizado na mesma operação; se a API multimídia do clipboard não estiver disponível, usará Markdown em `text/plain` como fallback.
- O subconjunto básico inclui títulos, parágrafos, ênfase, listas, links, citações e blocos de código. Tabelas e task lists podem ser usadas por templates que realmente precisem delas, com testes de compatibilidade específicos.
- Quebras de parágrafo serão representadas por linha em branco; quebras forçadas usarão os dois espaços finais exigidos pelo renderizador do Azure DevOps.
- HTML será derivado e sanitizado por allowlist; scripts, eventos inline, iframes e URLs inseguras serão rejeitados.
- A saída Markdown continuará visível para inspeção e será a fonte de verdade para testes de snapshot.

Base factual:

- [Microsoft Learn — Markdown Syntax for Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops): Azure DevOps suporta convenções Markdown comuns e a maioria das extensões GFM, com diferenças entre superfícies; JavaScript e iframes não são aceitos.
- [Microsoft Learn — Modify rich-text fields](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/bulk-modify-work-items?view=azure-devops#modify-rich-text-fields-in-bulk): Description, Acceptance Criteria, Repro Steps e outros campos ricos aceitam HTML.
- [Microsoft Learn — Add Work Item Comment API](https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/comments/add-work-item-comment?view=azure-devops-rest-7.1): comentários de work item possuem formatos `markdown` e `html`.

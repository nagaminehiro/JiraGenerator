# Azure Refactor

## Destination

Chegar a uma especificação de implementação sem decisões pendentes para reformular toda a aplicação JiraGenerator, com uma nova experiência de uso, templates canônicos em Markdown e um modelo simplificado de times.

O resultado deve permitir implementar e validar o refactor sem precisar decidir durante a execução como os templates, times, dados, interface ou compatibilidade funcionarão.

## Notes

- Todo o workspace versionado pode ser alterado: HTML, JavaScript, CSS, JSONs, documentação, testes e publicação.
- `HCMCOL` será substituído pelo nome canônico **Admissão Digital**.
- `HCMGRS` e `HCMNPC` serão consolidados no nome canônico **ATS Senior**.
- `HCMON` será removido.
- Todos os templates existentes devem ser revisados, deduplicados e convertidos para versões canônicas em Markdown.
- A aplicação será uma página interativa com apenas os times **ATS Senior** e **Admissão Digital**.
- Os templates serão selecionados em um list box e cada template declarará a quais times está vinculado.
- Cada campo declarará explicitamente se é obrigatório ou opcional; a interface e a validação obedecerão essa definição.
- O Markdown será atualizado enquanto o usuário preenche o formulário e renderizado em um componente ao lado dos campos.
- Um botão copiará para a área de transferência o conteúdo Markdown bruto gerado.
- O planejamento usa os skills `wayfinder`, `grilling` e `domain-modeling`.
- Os artefatos deste esforço ficam em `wayfinder/azure-refactor/`, conforme definido pelo usuário, em vez do diretório padrão `.scratch/` do tracker local.
- O mapa resolve decisões; a implementação do refactor começa somente após o fechamento da fronteira.
- Cada ticket resolvido deve gerar imediatamente um commit próprio, com mensagem semântica em português do Brasil e gitmoji.

## Decisions so far

- [Definir o contrato de saída Markdown](issues/01-definir-contrato-markdown.md) — Templates terão fonte canônica Markdown compatível com Azure DevOps, HTML sanitizado derivado para preview e cópia multimídia com fallback em texto Markdown.

## Not yet specified

- Direção visual, linguagem de interface, comportamento responsivo e nível de fidelidade do novo design.
- Texto final de cada template após a definição do catálogo canônico.
- Estratégia de compatibilidade para URLs, favoritos ou identificadores legados.
- Forma final da documentação operacional e de manutenção do catálogo.

## Out of scope

- Integração direta com APIs do Jira, autenticação ou criação automática de issues.
- Introdução de backend ou banco de dados sem que uma decisão posterior demonstre sua necessidade para o destino.

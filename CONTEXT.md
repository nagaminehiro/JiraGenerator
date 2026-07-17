# Jira Templates

Aplicação que padroniza conteúdo reutilizável para comentários e descrições de trabalho no Jira. O contexto distingue os times selecionáveis das estruturas canônicas usadas para gerar o conteúdo.

## Language

**Time**:
Recorte organizacional selecionado pelo usuário para determinar projetos e pessoas disponíveis.
_Avoid_: Equipe, squad

**Admissão Digital**:
Nome canônico do time atualmente identificado como `HCMCOL`.
_Avoid_: HCMCOL

**ATS Senior**:
Nome canônico do time resultante da consolidação de `HCMGRS` e `HCMNPC`.
_Avoid_: HCMGRS, HCMNPC

**Template canônico**:
Estrutura reutilizável e sem variantes duplicadas que define campos, obrigatoriedade e geração de conteúdo compatível com Azure Boards.
_Avoid_: Modelo por time, template legado

**Catálogo canônico de templates**:
União conservadora dos templates dos times ativos, sem duplicatas exatas. Toda intenção distinta é preservada até que seja explicitamente classificada como sobreposição ou obsoleta.
_Avoid_: Cópia dos catálogos por time, descarte implícito de template

**Aplicação do template**:
Destino declarado de um template canônico no Azure Boards: comentário, descrição do item ou ambos. As aplicações pertencem a um único catálogo e podem ser usadas para agrupar ou filtrar o seletor.
_Avoid_: Catálogo de comentários, catálogo de descrições

**Vínculo do template**:
Associação que torna um template canônico disponível para um ou mais times. Na consolidação, o vínculo é herdado dos catálogos ativos de origem e não é criado a partir do time removido.
_Avoid_: Cópia do template por time, vínculo herdado de HCMON

**Campo do template**:
Unidade de entrada declarada por um template canônico, classificada explicitamente como obrigatória ou opcional.
_Avoid_: Campo implicitamente obrigatório

**Pré-visualização Markdown**:
Representação renderizada em tempo real do documento Markdown produzido com os valores atuais do formulário.
_Avoid_: Output, resultado estático

**Conteúdo Azure Boards**:
Documento cuja fonte canônica é Markdown compatível com Azure DevOps e que também possui uma representação HTML sanitizada equivalente para visualização e cópia em campos ricos.
_Avoid_: Jira Wiki Markup, HTML autoral

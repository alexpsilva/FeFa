# To-Do

 - [x] Adicionar validação de inputs à API.
 - [x] Criar CRUD para o modelo de `Pacient`.

 - [x] Criar modelo de `Insurance`.
 - [x] Criar tela para manipular `Insurance` via `EditableTable`.
 - [x] Tratar campos computados (exibidos mas nunca editaveis. nem durante a criação do item). ex. `createdAt`, `updatedAt`, `id`.
 - [x] Permitir titulos de campos na `EditableTable`. (ex: title=>Name; key=>name).
 - [x] Desenvolver componente de `SideMenu` para transitar entre as telas.

 - [x] Desenvolver componente de `RedirectTable`, que lista itens mas não permite edição. Só redireciona para uma outra tela ao clicar.
 - [x] Adicionar função `toString` para configurar a formatação de cada campo nos componentes `EditableTable` e `RedirectTable`.

 - [x] Criar componente `MultiTabFrame`, que permite definir o conteúdo de diferentes abas.
 - [x] Centralizar gerência de entidades em um diretório unico (ja re-definimos `Pacient` 2 vezes)
 - [x] Criar tela para manipular `Pacient`s individuais via `MultiTabFrame` 
   - [x] Acumular alterações e só salvar uma vez ao 'confirmar alterações'
   - [x] Extrair tela de manipulação de `Pacient` em um componente `PacientSheet`
   - [x] Refatorar `PacientSheet` para permitir tanto a edição quanto criação de `Pacient`
   - [x] Permitir a criação de novos `Pacient`
   - [x] Permitir a deleção de `Pacient`
   - [x] Refatorar `EditableTable` para permitir editar multiplos registros antes de salvar
    - [x] Extrair hook `useCreatingRow` do componente `EditableTable` para facilitar composição/reutilização
    - [x] Mover requisições de dados iniciais para `getInitialProps`
    - [x] Adicionar endpoint `insurance/batch` para realizar update, create e delete em uma só request à API (rodar as 3 operações em paralelo no servidor)
    - [x] Atualizar `EditableTable` para só enviar linhas alteradas para update (hoje enviamos todas sempre)
    - [x] Limpar estado e aplicar alterações após salvar a `EditableTable`
   - [x] Adicionar manipulação de `Phone`s à tela de `Pacient`

 - [x] Organizar multiplos perfis git
 - [x] Passar este projeto para um repositório

 - [x] Criar modelo de `Appointment` no banco.
 - [x] Criar rotas para operações CRUD de `Appointment`.
 - [x] Adicionar tela de `Appointment` ao `SideMenu` via `RedirectTable`
 - [x] Refatorar `RedirectTable` para permitir campos via ForeignKey
 - [x] Adicionar nome do `Pacient` à tela `/appointment`
 - [x] Adicionar histórico de `Appointment` à primeira tela de `Pacient` via `SimpleTable`.
   -[x] (bug) Filtro de `pacientId` não está funcionando corretamente

 - [x] Escolher estratégia de Autenticação: Google Login
 - [x] Criar modelo de `User` (com dados de usuário e o hash da senha)
 - [x] Criar modelo de `Token` (1 `User` to n `Tokens`, com um campo `ExpiredAt`)
 - [x] Criar tela de `Login` (a partir da doc https://developers.google.com/identity/sign-in/web/sign-in?hl=pt-br)
 - [x] Configurar tratamento pós login via JS (https://developers.google.com/identity/gsi/web/reference/html-reference#data-login_uri)
 - [x] ref: https://www.intricatecloud.io/2020/12/passwordless-sign-in-with-google-one-tap-for-web/
 - [x] Implementar validação de tokens Google no backend (segundo esta doc https://developers.google.com/identity/sign-in/web/backend-auth?hl=pt-br)
 - [x] Criar rota `/login`, para validar o token Google. Se passar, verificar se o email do `User` é permitido. Se for, cria um `Token` e retorna o JWT associado
 - [x] Criar rota `/logout`, para invalidar um `Token`
 - [x] Criar middleware de autenticação que recebe um JWT possuindo um `Token.value` e valida de acordo com a tabela `Token`, bloqueando a requisição ou não. Caso o token seja valido, atualizar o campo `lastUsedAt`
 - [x] Adicionar middleware de autenticação a todas as rotas
 - [x] Implementar renovação automática de `Token`. Valido por período curto (~15 min) mas pode ser renovado por um período maior (limitado. provavelmente 12~24 horas)
 - [x] Guardar token de autenticação na seção do usuário
 - [x] Garantir que todas as paginas do client validam que o usuário está logado e, caso não esteja, redireciona para a tela de `Login`
 - [x] Garantir que após o `Login`, o usuário é redirecionado de volta para a pagina que estava (ao invés de sempre voltar para a home)
 
 - [x] Segregar modelos base (`Pacient` e `Insurance`) entre `User`s
 - [x] Atualizar todos os métodos para considerar o `User` autenticado
 - [x] Validar body, query e params de todas requests

 - [x] Adicionar `TailwindCSS` ao projeto
 - [x ] Refatorar componente `Table` para torna-lo mais 'composable' e usa-lo em todos cenários (ao invés de manter uma `EditableTable` e outra `SimpleTable`)
  - [x] Montar estrutura da table toda em um mesmo componente (para facilitar estilização)
  - [x] Extrair toda a gerência de estado para fora (ainda estavamos manipulando 'creatingRow' e 'onChange' internamente)
  - [x] Criar CompoundComponent `InlineButton` para implementar inlineActions
  - [x] Criar parametro `footer` que recebe um React.ReactNode como valores. Assim podemos configurar para adicionar novas linhas (e qualquer outra ação que desejarmos)

 - [x] Bug: Apesar de marcar multiplas linhas para deleção, só estamos apagando 1 depois de salvar

 - [x] Criar componente `NotificationBanner`, que exibe um banner temporário com as informações desejadas:
   - [x] Acessível em qualquer ponto da aplicação
   - [x] Define um `NotificationId` para permitir trocar o texto caso desejado (ao salvar um paciente, começa com 'Loading' e depois troca para 'Saved' ou 'Error')
   - [x] Pode definir um tempo de expiração, depois do qual, o banner some
   - [x] Adicionar botão de X ao banner, permitindo descartar notificações antes de sua expiração (apenas para notificações com expiração definida. notificações 'permanentes' como estados de Loading, não podem ser descartadas)

 - [x] Criar botão de `Logout`

 - [x] Adicionar busca à tela de `Pacient`

 - [x] Adicionar paginação à tela de `Pacient`
  - [x] Converter `PaginationLinks` em um CompoundComponent (permitindo estilizar os botões e o texto separadamente)
  - [x] Converter setas para <button>
  - [x] Marcar setas com a propriedade 'disabled' quando elas estiverem desabilitadas
  - [x] Utilizar os modificadores `enabled:` e `disabled:` para estilizar as setas condicionalmente
  - [x] Organizar estado da caixa de busca. Vai ficar no componente ou na pagina?
  - [x] Sanitizar termo de busca (hoje diferenciamos lower de uppercase)

 - [ ] Preferir max-width, min-width e min-height ao invés de width e height

 - [ ] Refatorar `fetchPacientWithAuth` para tornar mais legível (ex: resolver data.data)
 - [ ] Centralizar tratamento de erros e integrar com o sistema de notificação

 - [ ] Desenvolver componente de estilização do texto e adicionar à tela de `Appointment`. 
 HTML no banco, que é parseado para uma arvore de JSON server-side. O client-side só itera a arvore e renderiza as tags correspondentes
  - [ ] Suporte a negrito
  - [ ] Suporte a itálico
  - [ ] Suporte a sublinhado
  - [ ] (optional) Suporte a strikethrough
  - [ ] Suporte a texto colorido
  - [ ] Suporte a listagem (multiplos itens)
  - [ ] Suporte a enumeração (itens ordenados: 1. 2. 3.)
  - [ ] Suporte a alinhamento à esquerda
  - [ ] Suporte a alinhamento à direita
  - [ ] Suporte a alinhamento ao centro
  - [ ] Suporte a alinhamento justificado

 - [ ] Repensar criação de `Appointment` para sempre ser feita via tela de `Pacient`
 - [ ] Remover tela de listagem de `Appointment`

 - [ ] Bug: Google not initialized
 - [ ] Bug: Invalid refresh token
 - [ ] Bug: Se adicionarmos uma nova `Insurance`, salvarmos, deletarmos a mesma insurance e salvarmos denovo, ela reaparece (ou seja, não é deletada)
 - [ ] Bug: Estamos atualizando o `UpdatedAt` de todos os registros ao invés de só os alterados (em requests /batch)
 - [ ] Marcar items que serão deletados com 'strikethrough' em tabelas como operações batch
 - [ ] Juntar abas de 'Contato' e 'Dados Pessoais' do paciente
 
 - [ ] Ordernar tela de `Appointments` por data
 - [ ] Mostrar hora nas telas de listagem e edição de `Appointments` (o horario da consulta é relevante enquanto o horario de criação de um paciente não é)

 - [ ] Criar rotina de 'limpeza' para deletar `Token`s expirados a muito tempo
 - [ ] Validar se estamos de acordo com as boas praticas de autenticação: https://goteleport.com/blog/authentication-best-practices/

 - [ ] Desenvolver importação de dados (seja via Excell ou direto em base Access)


# Backlog (not essential)
 - [ ] Estilizar diferentes tipos de notificação de forma diferente (erro vermelho, sucesso verde ou azul, info em tons de cinza)

 - [ ] Criar ícone de lapis para indicar os campos que são editáveis (talvez só exibir on hover)

 - [ ] Implementar funcionalidades de SuperAdmin (ainda a decidir como):
   - [ ] Conseguir visualizar dados de diferentes `User`s (seja trocando de `User` exibido ou visualizando todos de uma vez)
   - [ ] CRUD para manipulação de `User`

 - [ ] Criar modelo de `Role` (inicialmente só com `admin` e `doctor`)
 - [ ] Incorporar filtro por `User.id` e `Role` em todas as rotas de CRUD (impedir que um `User` não-admin leia ou altere dados de outro)

 - [ ] Adicionar animação para a criação e expiração de notificações (slide de alguma das bordas ao invés de só aparecer do nada)
 - [ ] Adicionar barra de progresso para indicar o tempo de expiração de uma notificação

 - [ ] Criar modelo de `Medicine` para padronizar dados de `Prescription`.
 - [ ] Criar modelo de `Prescription`, tendo em mente que precisamos conseguir montar um histórico de mudanças de remédios (quando doses mudaram, remedios foram interrompidos, etc.).
 - [ ] Adicionar `Prescription` à primeira aba da tela de `Pacient` via `EditableTable`.
   - [ ] Mostrando apenas os atuais.
   - [ ] Linkando para o histórico daquele paciente.
   - [ ] Permitindo imprimir a receita atual.

 - [ ] Adicionar pedido de acesso à tela de `Login`
 - [ ] Criar tela para manipular pedidos de acesso (acessível apenas para Admin)

 - [ ] Criar modelo de `Condition` para padronizar dados de `PacientCondition`.
 - [ ] Criar modelo de `PacientCondition`, permitindo anotações para cada `Condition` que um paciente possui.
 - [ ] Adicionar à primeira aba da tela de `Pacient` via `EditableTable` (mostrando apenas os atuais e linkando para o histórico daquele paciente).

 - [ ] Adicionar ordenação customizavel à `Table`

 - [ ] Omitir a aba de consultas da `PacientSheet` durante a criação de `Pacients`
 - [ ] Criar configuração de valor padrão para `Pacient.country`, `Pacient.city` e `Pacient.state`
 - [ ] Testar interface mobile
 - [ ] Pedir confirmação antes de sair da tela com alterações pendentes
 - [ ] Adicionar suporte a Foreign Keys ao componente `Table`.

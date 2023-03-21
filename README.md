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
 - [ ] ref: https://www.intricatecloud.io/2020/12/passwordless-sign-in-with-google-one-tap-for-web/
 - [x] Implementar validação de tokens Google no backend (segundo esta doc https://developers.google.com/identity/sign-in/web/backend-auth?hl=pt-br)
 - [ ] Criar rota `/login`, para validar o token Google. Se passar, verificar se o email do `User` é permitido. Se for, cria um `Token` e retorna o JWT associado
 - [ ] Criar rota `/logout`, para invalidar um `Token`
 - [ ] Criar middleware de autenticação que recebe um JWT possuindo um `Token.id` e valida de acordo com a tabela `Token`, bloqueando a requisição ou não. Caso o token seja valido, atualizar o campo `lastUsedAt`
 - [ ] Criar rotina de 'limpeza' para deletar `Token`s expirados a muito tempo
 - [ ] Adicionar middleware de autenticação a todas as rotas
 - [ ] Guardar token de autenticação na seção do usuário
 - [ ] Criar botão de `Logout`
 - [ ] Validar se estamos de acordo com as boas praticas de autenticação: https://goteleport.com/blog/authentication-best-practices/

 - [ ] Segregar modelos base (`Pacient` e `Insurance`) entre `Pacient`s
 - [ ] Criar modelo de permissionamento: tabela `AllowsUser` que relaciona `User`, um recurso (ainda a definir como) e um grau de permissão (ainda a definir como)

Desnecessário por enquanto mas promete ser muito mais dificil de implementar depois que a aplicação se tornar mais complexa:
 - [ ] Entender 'Compound Components' e a 'Context API' para ver se consegue melhorar nosso código (ref: https://www.youtube.com/watch?v=vPRdY87_SH0)

 - [ ] Criar componente `NotificationBanner`, que exibe um banner temporário no topo da tela com as informações desejadas:
   - [ ] Acessível em qualquer ponto da aplicação
   - [ ] Retorna um `NotificationId` para permitir trocar o texto caso desejado (ao salvar um paciente, começa com 'Loading' e depois troca para 'Saved' ou 'Error')

 - [ ] Centralizar tratamento de erros para conseguir reportá-los em qualquer ponto da aplicação (React ErrorBoundry?, Integrar com `NotificationBanner`)

 - [ ] Criar modelo de `Role` (inicialmente só com `admin` e `doctor`)
 - [ ] Incorporar filtro por `User.id` e `Role` em todas as rotas de CRUD (impedir que um `User` não-admin leia ou altere dados de outro)
 
 - [ ] Decidir entre usar `PicoCSS` ou `TailwindCSS`
 - [ ] Estilizar componentes...

 - [ ] Desenvolver importação de dados (seja via Excell ou direto em base Access)
 


# Backlog (not essential)
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

 - [ ] Adicionar ordenação customizavel a `SimpleTable` e `EditableTable`
 - [ ] Adicionar busca a `SimpleTable` e `EditableTable`
 - [ ] Adicionar paginação a `SimpleTable` e `EditableTable`

 - [ ] Refatorar `useImediateInlineDelete` para guardar os ids dos elementos deletados
 - [ ] Substituir todos os usos de `useDeleayedInlineDelete` por `useImediateInlineDelete`
 - [ ] Renomear `useImediateInlineDelete` para `useInlineDelete`

 - [ ] Omitir a primeira aba da `PacientSheet` durante a criação de `Pacients`
 - [ ] Adaptar `SimpleTable` para permitir colunas com valores aninhados (ex: `appointment.pacient.name`)
 - [ ] Criar configuração de valor padrão para `Pacient.country`, `Pacient.city` e `Pacient.state`
 - [ ] Avaliar se vale a pena utilizar `NextJS` ou se seria melhor com `React` puro
 - [ ] Testar interface mobile
 - [ ] Pedir confirmação antes de sair da tela com alterações pendentes
 - [ ] Transformar `SideMenu` em `SandwichMenu`, permitindo que ele seja colapsado
 - [ ] Escolher ferramenta que permita estilização do texto de um `Appointment`.
 - [ ] Adicionar suporte a Foreign Keys ao componente `EditableTable`.

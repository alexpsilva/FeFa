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

 - [x] Escolher estratégia de Autenticação: Statefull JWT
 - [ ] Criar modelo de `User` (com dados de usuário e o hash da senha)
 - [ ] Criar modelo de `Token` (1 `User` to n `Tokens`, com um campo `ExpiredAt`)
 - [ ] Criar rota `/signup`, para criar `User`, criar um `Token` e retorna-lo
 - [ ] Criar rota `/login`, para validar a senha do `User`, criar um `Token` e retorna-lo
 - [ ] Criar rota `/logout`, para invalidar um `Token`
 - [ ] Criar lógica de 'limpeza' para deletar `Token`s expirados a muito tempo
 - [ ] Criar middleware de autenticação que recebe um JWT possuindo um `token_id` e valida de acordo com a tabela `Token`, bloqueando a requisição ou não
 - [ ] Adicionar middleware de autenticação a todas as rotas
 - [ ] Criar tela de `Login`
 - [ ] Guardar token de autenticação na seção do usuário
 - [ ] Criar botão de `Logout`

Desnecessário por enquanto mas promete ser muito mais dificil de implementar depois que a aplicação se tornar mais complexa:
 - [ ] Segregar modelos atuais entre `User`s
 - [ ] Criar modelo de `Role` (inicialmente só com `admin` e `doctor`)
 - [ ] Incorporar filtro por `User.id` e `Role` em todas as rotas de CRUD (impedir que um `User` não-admin leia ou altere dados de outro)

 - [ ] Criar componente `NotificationBanner`, que exibe um banner temporário no topo da tela com as informações desejadas:
   - [ ] Acessível em qualquer ponto da aplicação
   - [ ] Retorna um `NotificationId` para permitir trocar o texto caso desejado (ao salvar um paciente, começa com 'Loading' e depois troca para 'Saved' ou 'Error')

 - [ ] Centralizar tratamento de erros para conseguir reportá-los em qualquer ponto da aplicação (React ErrorBoundry?, Integrar com `NotificationBanner`).
 
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

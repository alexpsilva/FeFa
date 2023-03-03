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
 - [ ] Criar tela para manipular `Pacient`s individuais via `MultiTabFrame` 
   - [x] Acumular alterações e só salvar uma vez ao 'confirmar alterações'
   - [x] Extrair tela de manipulação de `Pacient` em um componente `PacientSheet`
   - [x] Refatorar `PacientSheet` para permitir tanto a edição quanto criação de `Pacient`
   - [x] Permitir a criação de novos `Pacient`
   - [x] Permitir a deleção de `Pacient`
   - [ ] Refatorar `EditableTable` para permitir editar multiplos registros antes de salvar
    - [x] Extrair hook `useCreatingRow` do componente `EditableTable` para facilitar composição/reutilização
    - [x] Mover requisições de dados iniciais para `getInitialProps`
    - [x] Adicionar endpoint `insurance/batch` para realizar update, create e delete em uma só request à API (rodar as 3 operações em paralelo no servidor)
    - [x] Atualizar `EditableTable` para só enviar linhas alteradas para update (hoje enviamos todas sempre)
    - [x] Limpar estado e aplicar alterações após salvar a `EditableTable`
   - [ ] Adicionar manipulação de `Phone`s à tela de `Pacient`

 - [x] Organizar multiplos perfis git
 - [x] Passar este projeto para um repositório

 - [ ] Criar modelo de `Appointment` no banco.
 - [ ] Criar rotas para operações CRUD de `Appointment`.
 - [ ] Adicionar tela de `Appointment` ao `SideMenu` via `RedirectTable`
 - [ ] Adicionar histórico de `Appointment` à primeira tela de `Pacient` via `RedirectTable`.

 - [ ] Segregar base entre `User`s.
 - [ ] Criar tela de `Login`.
 - [ ] Adicionar token de autenticação ao estado da aplicação (evitar cookies).
 - [ ] Adicionar autenticação a todas as demais rotas.
 
 - [ ] Decidir entre usar `PicoCSS` ou `TailwindCSS`
 - [ ] Estilizar componente `EditableTable`.
 - [ ] Estilizar componente `RedirectTable`.
 - [ ] Estilizar componente `MultiTabFrame`.
 - [ ] Estilizar componente `SideMenu`.

 - [ ] Desenvolver importação de dados (seja via Excell ou direto em base Access)
 


# Backlog (not essential)
 - [ ] Criar componente `NotificationBanner`, que exibe um banner temporário no topo da tela com as informações desejadas:
   - [ ] Acessível em qualquer ponto da aplicação (talvez redux?)
   - [ ] Retorna um `NotificationId` para permitir trocar o texto caso desejado (ao salvar um paciente, começa com 'Loading' e depois troca para 'Saved' ou 'Error')

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

 - [ ] Adicionar ordenação customizavel a `RedirectTable` e `EditableTable`
 - [ ] Adicionar busca a `RedirectTable` e `EditableTable`
 - [ ] Adicionar paginação a `RedirectTable` e `EditableTable`

 - [ ] Se utilizarmos o valor atual de algum estado, devemos utilizar uma função de `setState` ao invés de utilizar a variavel diretamente
 - [ ] Avaliar se vale a pena utilizar `NextJS` ou se seria melhor com `React` puro
 - [ ] Avaliar se vale a pena trocar `useState` por `useReducer` ou uma `Redux Store` em algum lugar
 - [ ] Testar interface mobile
 - [ ] Pedir confirmação antes de sair da tela de `Pacient` sem salvar alterações
 - [ ] Transformar `SideMenu` em `SandwichMenu`, permitindo que ele seja colapsado
 - [ ] Escolher ferramenta que permita estilização do texto de um `Appointment`.
 - [ ] Adicionar suporte a Foreign Keys ao componente `EditableTable`.
 - [ ] Desenvolver sistema centralizado de gerência de erros que consegue reportá-los independente do ponto da aplicação (seja enviando para o backend ou via console).
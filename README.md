# To-Do

 - [ ] Bug: Google not initialized
 - [ ] Bug: Estamos atualizando o `UpdatedAt` de todos os registros ao invés de só os alterados (em requests /batch)

 - [ ] Validar se estamos de acordo com as boas praticas de autenticação: https://goteleport.com/blog/authentication-best-practices/

 - [ ] Desenvolver importação de dados (seja via Excell ou direto em base Access)


# Backlog (not essential)
 - [ ] Configurar página 404.js para tratar erros de roteamento
 - [ ] Configurar página 500.js para tratar erros durante SSR (getInitialProps)
 - [ ] Exportar erros para um centralizador (ex: Sentry)

 - [ ] Estilizar diferentes tipos de notificação de forma diferente (erro vermelho, sucesso verde ou azul, info em tons de cinza)
 - [ ] Adicionar animação para a criação e expiração de notificações (slide de alguma das bordas ao invés de só aparecer do nada)
 - [ ] Adicionar barra de progresso para indicar o tempo de expiração de uma notificação

 - [ ] Implementar funcionalidades de SuperAdmin (ainda a decidir como):
   - [ ] Conseguir visualizar dados de diferentes `User`s (seja trocando de `User` exibido ou visualizando todos de uma vez)
   - [ ] CRUD para manipulação de `User`

 - [ ] Criar modelo de `Role` (inicialmente só com `admin` e `doctor`)
 - [ ] Incorporar filtro por `User.id` e `Role` em todas as rotas de CRUD (impedir que um `User` não-admin leia ou altere dados de outro)

 - [ ] Criar modelo de `Medicine` para padronizar dados de `Prescription`.
 - [ ] Criar modelo de `Prescription`, tendo em mente que precisamos conseguir montar um histórico de mudanças de remédios (quando doses mudaram, remedios foram interrompidos, etc.).
 - [ ] Adicionar `Prescription` à primeira aba da tela de `Pacient`.
   - [ ] Mostrando apenas os atuais.
   - [ ] Linkando para o histórico daquele paciente.
   - [ ] Permitindo imprimir a receita atual.

 - [ ] Adicionar pedido de acesso à tela de `Login`
 - [ ] Criar tela para manipular pedidos de acesso (acessível apenas para Admin)

 - [ ] Criar modelo de `Condition` para padronizar dados de `PacientCondition`.
 - [ ] Criar modelo de `PacientCondition`, permitindo anotações para cada `Condition` que um paciente possui.
 - [ ] Adicionar à primeira aba da tela de `Pacient` via `EditableTable` (mostrando apenas os atuais e linkando para o histórico daquele paciente).

 - [ ] Testar interface mobile

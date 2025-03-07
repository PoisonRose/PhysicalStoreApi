# PhysicalStoreApi

## Descrição do Projeto

### Sobre o projeto

O projeto faz parte de uma série de desafios feitos pela empresa Compass UOL aos estagiários na trilha de backend, de DEZ/2024, sendo esse o Desafio 02. Consiste no desenvolvimento de uma estrutura de uma Physical Store com Backend, utilizando as tecnologias e conhecimentos aprendidos no curso. Com o objetivo de avaliar a resolução de problemas. Utilizando das ferramentas necessárias e a assertividade frente às demandas solicitadas.

### Regras de aplicação

O projeto é a criação de um Physical Store que irá conter as lojas de uma determinada loja eCommerce.
- Para isso você poderá utilizar a API do ViaCEP (https://viacep.com.br/) ao qual irá trazer as informações de endereço das lojas. Você poderá criar quantas lojas achar necessário.
- O usuário deverá localizar as lojas físicas presentes em um raio de 100km através da busca pelo CEP. Devendo retornar como prioridade na lista, a loja mais próxima ao CEP digitado.
- Caso não tenha nenhuma loja próxima ao CEP digitado, deverá ser tratado com mensagem informativa.
- Trazer as informações da loja física de forma organizada (Nome da Loja, Rua, Número ...)
- Não será necessário a criação de um Front, a aplicação deverá rodar por meio do terminal.
- Deverá ser implementado a geração dos logs, com a utilização do Winston para a geração dos logs em formato json.

### Regras de aplicação - Requisitos do sistema

- **Tecnologias**: JavaScript ou Typescript  
- **Desenvolvimento de rotas**: Poderá ser usado o Express  
- **Não será permitido**: Framework de Acelerador de Desenvolvimento, nenhum CLI, exemplos: Nest.js; Fastify; Node.js(além do necessário), FastAPI entre outros.  
- **Banco de dados**: De livre escolha. Vai ser preciso utilizar alguma biblioteca para conexão com o serviço.
-  O **básico e simples do JS ou TS**. utilizando:
    - express;
    - node-fetch ou axios no máximo
    - winston;
    - typescript; // em caso de ts
    - @types/express; // em caso de ts
    - ts-node; // em caso de ts  
- **Boas práticas**: O código deve ser desenvolvido seguindo as boas práticas de desenvolvimento de software, para garantir a qualidade e a manutenibilidade.
- **Versionamento**: O código fonte deve estar no repositório do GitHub.

### Escolhas do desenvolvedor

Segue a lista de escolhas feitas pelo desenvolvedor para a aplicação do projeto:

- **Tecnologia**: Typescript
- **Banco de dados**: SQLite
- **acesso a APIs**: axios
- **APIs adicionais**: Nominatim

### Dependências

| Nome | Descrição |
| ---- | --------- |
| express | Framework para o backend |
| axios | Biblioteca para fazer requisições HTTP
| sqlite e sqlite3 | acesso e manipulação do banco de dados |
| winston | gerenciamento de logs |
| typescript, @types/express, @types/node, ts-node | permite o uso de typescript para o desenvolvimento |
| nodemon | ferramenta para reabrir o servidor no caso de alterações no projeto |

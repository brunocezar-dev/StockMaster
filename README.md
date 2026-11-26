# StockMaster — Sistema de Estoque

Aplicação de portfólio para cadastro de produtos e fornecedores, movimentação de mercadorias e acompanhamento de níveis de estoque.

## Tecnologias
- Java 17
- Spring Boot 3.3.5
- Spring Web, Spring Data JPA e MySQL Driver
- MySQL 8+
- HTML5, CSS3 e JavaScript
- Chart.js

## Estrutura
```text
StockMaster/
├── index.html
├── style.css
├── app.js
├── README.md
├── assets/photo.png
└── backend/
    ├── pom.xml
    └── src/main/
        ├── java/br/com/stockmaster/
        │   ├── StockMasterApplication.java
        │   ├── config/
        │   ├── model/
        │   ├── repository/
        │   └── controller/
        └── resources/application.properties
```

## Executar a interface
1. Extraia o ZIP e abra a pasta `StockMaster` no VS Code.
2. Abra `index.html` com a extensão Live Server.
3. A interface inicia em modo demonstração. Os dados ficam salvos no localStorage do navegador, sem precisar configurar o banco.

## Executar o backend Java + MySQL
Pré-requisitos: JDK 17, Maven e MySQL 8+.
1. Crie o banco:
   ```sql
   CREATE DATABASE stockmaster CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Edite `backend/src/main/resources/application.properties` e ajuste usuário e senha.
3. No terminal:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. A API ficará em `http://localhost:8080`.

## Conectar o front-end
No arquivo `app.js`, altere `const DEMO_MODE=true` para `false` e abra a interface via Live Server.

## Endpoints REST
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/products` | Listar produtos |
| POST | `/api/products` | Cadastrar produto |
| GET | `/api/suppliers` | Listar fornecedores |
| POST | `/api/suppliers` | Cadastrar fornecedor |
| GET | `/api/movements` | Listar movimentações |
| POST | `/api/movements` | Registrar entrada ou saída |

Exemplo de produto:
```json
{
  "name": "Teclado sem fio",
  "category": "Informática",
  "sku": "INF-001",
  "quantity": 10,
  "minimumStock": 3,
  "price": 89.90,
  "supplierId": 1
}
```

## GitHub
Na pasta `StockMaster`, execute:
```bash
git init
git add .
git commit -m "feat: cria sistema StockMaster"
git branch -M main
```
Crie um repositório vazio chamado `StockMaster` no GitHub e execute:
```bash
git remote add origin https://github.com/SEU-USUARIO/StockMaster.git
git push -u origin main
```
Substitua `SEU-USUARIO` pelo seu usuário do GitHub.

## Observações
- O modo demonstração usa localStorage e não requer MySQL.
- O backend é uma base didática para portfólio. Antes de usar em produção, adicione autenticação, autorização, validação de regras de negócio, testes, paginação e auditoria.


# Projeto BRDrive - Desafio de Seleção para Estágio em Desenvolvimento

Este projeto foi desenvolvido como parte do processo seletivo da empresa **BRDrive**. O objetivo principal foi criar uma aplicação fullstack para gerenciar um zoológico, com funcionalidades de inserção, edição, exclusão e busca de animais no sistema.

## Funcionalidades

- **Cadastro de Animais**: Permite adicionar animais ao zoológico com informações como nome, espécie, descrição e imagem.
- **Edição de Dados**: Os dados dos animais cadastrados podem ser atualizados.
- **Remoção de Animais**: Os animais cadastrados podem ser removidos do sistema.
- **Busca de Animais**: A aplicação permite a busca por nome ou ID dos animais no banco de dados.
- **Interface Responsiva**: O design da aplicação foi pensado para garantir uma boa experiência em diferentes dispositivos.

## Tecnologias Utilizadas

- **Frontend**: Next.js, React
- **Backend**: API Routes no Next.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Estilos**: CSS Modules
- **Outras Tecnologias**: Node.js

## Como Rodar o Projeto

### Pré-requisitos

1. **Node.js**: Certifique-se de que o Node.js está instalado em sua máquina. Você pode verificar se ele está instalado com o seguinte comando:

   ```bash
   node -v

2. **PostgreSQL**: Instale o  PostgreSQL e o deixe rodando localmente:
  Você pode baixar aqui:
  https://www.postgresql.org/download/

3. **Clonar o repositório** https://github.com/Miguel060/desafioVagaBRDRIVE.git 

4. **Instale as dependências** na pasta raiz do projeto 
   ```bash
   npm install

5. ## Configurar o Banco de Dados
  Este projeto utiliza **PostgreSQL** como banco de dados e **Prisma** como ORM para facilitar a comunicação com ele.

Crie um banco de dados PostgreSQL local com o nome zoologico:

- **Banco**: `zoologico`  
- **Usuário**: `postgres`  
- **Senha**: `sua_senha`  

---

### Criando o arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` e adicione a seguinte variável de ambiente:

```env
  DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
```
Substitua os campos conforme seu banco real. Ex:
```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/zoologico"
```
 6. ## Gerando o Prisma Client
    Após configurar a variável de ambiente com a URL do banco de dados, você deve gerar o Prisma Client com o seguinte comando:
    ```bash
    npx prisma generate
    ```
    Isso criará o cliente que será utilizado para acessar o banco de dados de forma tipada dentro do projeto.

7. ## Rodando as migrações
    Para criar as tabelas no banco de dados com base no schema do Prisma, utilize:
    ```bash
      npx prisma migrate dev --name init
     ```
  Esse comando:
    Cria uma nova migração com o nome init;
    Aplica a migração ao banco de dados;
    Gera o Prisma Client novamente (automaticamente).
    
8. ## Inserindo dados automáticamente no banco:
     ```bash
    npm run seed

9. ## Rodando o projeto. Obs: entre na pasta do projeto /rojectZoo
    ```bash
    npm run dev
    ```
10. ## Acesse o navegador com http://localhost:<porta que está rodando seu projeto> ex: https://localhost:3000


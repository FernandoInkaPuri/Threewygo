# Threewygo - Plataforma de Cursos Online

## Descrição do Projeto

Threewygo é uma plataforma de aprendizado online, que mostra que aprender pode ser divertido e prazeroso. O sistema foi projetado com uma interface responsiva, otimizada para dispositivos móveis, e permite a visualização de vídeos, cadastro, edição e exclusão de cursos.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- **Backend**: `threewygo_backend` - Responsável pela lógica de negócios e pela manipulação dos dados dos cursos.
- **Frontend**: `threewygo_frontend` - Interface do usuário desenvolvida com React e Chakra UI.

A estrutura do projeto é a seguinte:


## Funcionalidades

### Requisitos Implementados

1. **Tela Inicial**: Lista os cursos ativos
2. **Responsividade**: Layout responsivo para dispositivos móveis
3. **Detalhes dos Cursos**: Cada curso exibe título, descrição e vídeos do curso
4. **Filtragem de Cursos**: Cursos são apresentados com base na data de término. São listados apenas os que ainda não encerraram
5. **Cadastro de Cursos**: Link para formulário de cadastro de novos cursos
6. **Edição e Exclusão**: Funcionalidades para editar e deletar os cursos na página do próprio curso.


🌟 **Diferenciais do Projeto**:

- **Single Page Application (SPA)**:
- **Uso de TypeScript**:
- **Uso de React**:
- **Uso de Chakra UI**:
- **Uso de Testes Unitários com Rspec**:
- **Uso de Docker**:


## Tecnologias Utilizadas

- **Backend**: Ruby on Rails
- **Frontend**: React com TypeScript
- **UI**: Chakra UI
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker

## Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados.

### Passos para Executar a Aplicação

1 -  Clone o repositório:
  ```
  git clone git@github.com:FernandoInkaPuri/Threewygo.git
  cd threewygo
  ```

2 - Execute o Docker Compose:
  ```
  docker-compose up --build
  ```

3 - Acesse a aplicação em http://localhost:3001/

### Para Executar os Testes
  ```
  docker-compose run --rm threewygo_backend rspec  
  ```
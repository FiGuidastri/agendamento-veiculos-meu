# Backend - Vehicle Schedule Manager

## Descrição

Este é o backend do sistema de agendamento de veículos, construído com Flask. Ele fornece APIs para autenticação de usuários, gerenciamento de veículos e agendamentos.

## Prerequisitos

- Python 3.7 ou superior
- pip (Python package installer)

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/agendamento-veiculos-meu.git
    cd agendamento-veiculos-meu/backend
    ```

2. Crie um ambiente virtual e ative-o:
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
    ```

3. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

4. Execute a aplicação:
    ```bash
    python app.py
    ```

## Endpoints

- `POST /register`: Registra um novo usuário.
- `POST /login`: Autentica um usuário e retorna um token JWT.
- `POST /vehicles`: Adiciona um novo veículo (apenas para usuários master).
- `POST /schedules`: Adiciona um novo agendamento de veículo.

## Configuração

Certifique-se de configurar as variáveis de ambiente no arquivo `app.py`:
- `SQLALCHEMY_DATABASE_URI`: URI do  debanco dados.
- `JWT_SECRET_KEY`: Chave secreta para JWT.

## Estrutura do Projeto

## Contributing

Feel free to submit issues and pull requests. Your contributions are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
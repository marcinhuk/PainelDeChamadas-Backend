#  Backend do Painel de Chamadas

Esse aplicativo pode ser usado como um painel eletrônico para lanchonetes.

Nesse projeto foi usado o Express, JSON-Server como a API e banco de dados e o Socket.io para envio e recebimento das informações em tempo real.

## 🔨 Detalhes para execução do projeto :

1. Entrar no diretório onde o projeto será clonado;
2. Abrir o Git Bash;
3. Executar "git clone https://github.com/marcinhuk/PainelDeChamadas-Backend.git";
4. Executar "cd ./PainelDeChamadas-Backend";
5. Executar "npm install";
6. Criar um arquivo chamado ".env" na raiz do projeto e dentro dele as variáveis abaixo:

```javascript
	JSON_SERVER_URL="http://localhost"
	JSON_SERVER_PORT="3333"
	HTTP_SERVER_URL="http://localhost"
	HTTP_SERVER_PORT="3000"
```

7. Executar "npm start".
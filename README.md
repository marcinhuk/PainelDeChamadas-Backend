#  Backend do Painel de Chamadas

Esse aplicativo pode ser usado como um painel eletrônico para lanchonetes.

1. O número dos pedidos serão incuídos ou excluídos;
2. O Layout (linha x coluna) de exibição pode ser alterado;
3. É possível suprimir o som na inclusão de novos pedidos.

Nesse projeto foi usado o Express, JSON-Server como a API e banco de dados e o Socket.io para envio e recebimento das informações em tempo real.

# Detalhes para execução do projeto:

#### Ambientes:

1. /.env

#### Variáveis de ambiente:

1. JSON_SERVER_URL="http://localhost"
2. JSON_SERVER_PORT="3333"
3. HTTP_SERVER_URL="http://localhost"
4. HTTP_SERVER_PORT="3000"
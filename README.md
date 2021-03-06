# Reclame-Conosco

Reclame conosco é o nome dado a aplicação Nodejs que tem por objetivo coletar denúncias através de uma requisição POST

### Antes de Rodar o projeto

+ Windows
+ npm install
+ Copie e cole no navegador https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100
+ Baixe a opção  Redis-x64-3.2.100.zip e extrai na area de trabalho
+ execute com duplo clique o arquivo redis-server
+ Crie uma conta em https://developer.mapquest.com/ (é gratuito)
+ Copie a sua chave Key e cole no arquivo .env em API_KEY=

+ Banco de dados

+ Instale na sua maquina caso não tenha o PostgreSQL
+ Intale um Cliente SQL como DBEAVER ou HeidiSQL ou use o pgAdmin que ja vem com o Postgres
+ Crie um banco de dados com nome de sua preferencia
+ Crie uma tabela com nome denunciantes
+ Crie as colunas: id, nome, cpf, titulo, descricao, latitude, longitude, logradouro, bairro, cidade, estado, pais, cep

+ OBS: lembre de colocar os dados do seu banco para conexão no arquivo .env (Mais informaçoes veja em .env)

+ Com banco de dados iniciado agora sim!!!

+ npm start

+ Se der erro use yarn install

+ Para executar os teste abra o arquivo api.test.js em tests verefique o campo que dejesa testar execute no cmd npm test

### Modelo de objeto esperado no body/request | copie e cole no Postman para testar
```
{
  "latitude": "-23.5617836",
  "longitude": "-46.6579964",
  "denunciante": {
    "nome": "Adailton josé",
    "cpf": "54574351055"
  },
  "denuncia": {
    "titulo": "Esgoto a céu aberto",
    "descricao": "Existe um esgoto a céu aberto nesta localidade."
  }
}
```

### Tecnologias 

+ Back-end: Nodejs | express | Javascript
+ Banco de dados:  PostgreSQL e SQL
+ Armazenamento de Cache:  Redis server
+ Testes: jest e supertest

### Dependências

+ axios
+ body-parser
+ cors
+ dotenv
+ express
+ ioredis
+ pg

### 

+ Durante o a construção decidir usar poucas bibliotecas e fiz validaçoes com javascript puro para exercitar a lógica
o que não é algo comum no dia a dia

+ SQL ao invés de ORM e MODELS: decidi por usar SQL por ser uma linguagem poderosa e um pouco esquecida devido a 
utilização de ORM com bibliotecas que executam o SQL de maneira simples

+ O teste realizado tem o objetivo de verificar o request post para que todos os campos sejam preenchidos
e não ocorra erros durante a execução do SQL INSERT ou insira valores nulos no Banco de Dados

+ É realizada uma validação de CPF com toda lógica construida apenas com Javascript 
sem bibliotecas ou requisição em base de dados uma forma simples e rapida para uma 
verificação de baixo nivel em pequenos projetos


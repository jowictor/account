# desafio-dev

## Primeiros passos
<p>
Ao realizar o clone do projeto deve ser executado  os seguintes comandos na pasta raiz:<br />

<ol>
  <li>docker-compose up</li>
  <li>npm install</li>
  <li>npm run start:dev</li>
</ol>
</p>


## Rota
<p>
<strong>POST: http://localhost:3050/api/v1/account/cnab</strong><br />

Pra realização do teste é necessário apenas o envio do arquivo cnab.txt (Disponível em: https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt)<br />
Os testes foram realizados utilizando o programa Postman, opção form-data >> KEY: file >> VALUE: arquivo
</p>

## Teste unitário
<p>
Foi utilizado o <strong>Jest framework </strong>para programação dos testes.<br>
Para realizar o teste é necessario o seguinte comando: npm run test ou selecionar o item "test" no package.json. <br>
<strong>Antes de rodar o comando é importante que a API tenha sido iniciada primeiramente, para que as tabelas sejam criadas.</strong>
</p>

## Tecnologias


<ul>
  <li>NestJs</li>
  <li>Sequelize</li>
  <li>PostgreSql</li>
  <li>Jest</li>
  <li>Docker</li>
  <li>Compodoc</li>
</ul>

## Documentação
A documentação encontra-se disponóvel na pasta docs.

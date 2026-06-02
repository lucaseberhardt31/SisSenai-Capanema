const express = require('expres');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

//config do server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());//Necessário para o carinho de compras (JSON)
app.use(express.static('.'));//Serve seus arquivos HTML, CSS e imagens

//conexão com o Banco de dados
const db = new sqlite3.Database('./sissenai.db');

//inicialização das Tabelas
db.serialize(() => {
  //Tabela de clientes
  db.run('CREATE TABLE IF NOT EXISTS cliente(
   id INTERGER PRIMARY KEY AUTOINCREMENT,
   nome TEXT,
   cpf TEXT,
   telefone TEXT,
    )');

//---Rotas de Clientes---
app.post('salvar-cliente',(req, res) => {
const { nome, cpf, telefone } = req.body;
db.run('INSERT INTO clientes (nome, cpf, telefone) VALUES (?, ?, ?)`, [nome, cpf, telefone], (err) => {
       if (eff) return res.status(500).send(err.message);
       res.redirect('/clientes.html');
    });
});
//iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`=============================================`)
  console.log(`SISSENAI RODANDO EM: http://localhost:${PORT}`)
  console.log(`=============================================`)
});

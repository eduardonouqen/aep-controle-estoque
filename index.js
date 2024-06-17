const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'estoque',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

app.post('/add-item', (req, res) => {
  const { nome, quantidade, medida } = req.body;
  const query = 'INSERT INTO itens (nome, quantidade, medida) VALUES (?, ?, ?)';
  db.query(query, [nome, quantidade, medida], (err, result) => {
    if (err) {
      console.error('Erro ao inserir item:', err);
      res.status(500).send('Erro ao inserir item');
      return;
    }
    res.status(200).send('Item inserido com sucesso');
  });
});

app.get('/items', (req, res) => {
  const query = 'SELECT * FROM itens';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar itens:', err);
      res.status(500).send('Erro ao buscar itens');
      return;
    }
    res.status(200).json(results);
  });
});

app.delete('/delete-item/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM itens WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar item:', err);
      res.status(500).send('Erro ao deletar item');
      return;
    }
    res.status(200).send('Item deletado com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
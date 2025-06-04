const express = require('express');
const cors = require('cors');
const app = express();
const usuarios = require('./usuarios.json');

app.use(cors());

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});

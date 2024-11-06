const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  database: 'StockCar'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');
});


// Create Cliente
app.post('/clientes', (req, res) => {
  const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;
  db.query('INSERT INTO clientes SET ?', { nome, cpf, email, endereco, data_nascimento, data_cadastro }, (err, result) => {
    if (err) throw err;
    res.send('Cliente adicionado com sucesso!')    ;
  });
});

// Read Clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update Cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;
  db.query('UPDATE clientes SET ? WHERE cliente_id = ?', [{ nome, cpf, email, endereco, data_nascimento, data_cadastro }, id], (err) => {
    if (err) throw err;
    res.send('Cliente atualizado com sucesso!');
  });
});

// Delete Cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE cliente_id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Cliente deletado com sucesso!');
  });
});


// Create Telefone
app.post('/telefones', (req, res) => {
  const { cliente_id, numero, tipo } = req.body;
  db.query('INSERT INTO telefone SET ?', { cliente_id, numero, tipo }, (err) => {
    if (err) throw err;
    res.send('Telefone adicionado com sucesso!');
  });
});

// Read Telefones
app.get('/telefones', (req, res) => {
  db.query('SELECT * FROM telefone', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update Telefone
app.put('/telefones/:id', (req, res) => {
  const { id } = req.params;
  const { cliente_id, numero, tipo } = req.body;
  db.query('UPDATE telefone SET ? WHERE telefone_id = ?', [{ cliente_id, numero, tipo }, id], (err) => {
    if (err) throw err;
    res.send('Telefone atualizado com sucesso!');
  });
});

// Delete Telefone
app.delete('/telefones/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM telefone WHERE telefone_id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Telefone deletado com sucesso!');
  });
});


// Create Carro
app.post('/carros', (req, res) => {
  const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id } = req.body;
  db.query('INSERT INTO carros SET ?', { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id }, (err) => {
    if (err) throw err;
    res.send('Carro adicionado com sucesso!');
  });
});

// Read Carros
app.get('/carros', (req, res) => {
  db.query('SELECT * FROM carros', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update Carro
app.put('/carros/:id', (req, res) => {
  const { id } = req.params;
  const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id } = req.body;
  db.query('UPDATE carros SET ? WHERE carros_id = ?', [{ marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id }, id], (err) => {
    if (err) throw err;
    res.send('Carro atualizado com sucesso!');
  });
});

// Delete Carro
app.delete('/carros/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM carros WHERE carros_id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Carro deletado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})

const cors = require('cors');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt');


//------------------------------------------------------------------------------------------------------------------------
const app = express();
const db = new sqlite3.Database('database.db');
app.use(bodyParser.json());
app.use(cors());


//------------------------------------------------------------------------------------------------------------------------
//rota de Cadastro (importante para explicar na apresentação)

app.post('/cadastro', async (req, res) => {
    const {nome, usuario, telefone, endereco, senha } = req.body;
    console.log("Dados recebidos:", req.body); 

    const hashdSenha = await bcrypt.hash (senha,10)

    const query = `INSERT INTO usuarios (nome, usuario, telefone, endereco, senha) VALUES (?,?,?,?,?)`;

    db.run (query, [nome, usuario, telefone, endereco, hashdSenha], function(err) {
        if (err) {
            console.error("Erro ao inserir dados no banco:", err);
            return res.status(500).json ({error: "Erro ao cadastrar o usuário."});
        }
        console.log("Usuário inserido com sucesso:", this.lastID);
        res.json ({message: "Cadastrado com sucesso"});
    });
});

//rota de login: 

app.post ('/login', (req, res) => {
    const {usuario, senha} = req.body;

    if (!usuario || !senha) {
        return res.status (400).json({error: "Campos de usuário ou senha ausentes"})
    }

    const query = `SELECT * FROM usuarios WHERE usuario = ?`;
    db.get (query, [usuario], (err, row) => {
        if (err) {
            return res.status(500).json ({error: "Erro ao consultar o banco de dados"})
        }

        if (!row){
            return res.status(400).json({error: "Usuário não encontrado."})
        }
    
        bcrypt.compare(senha, row.senha, (err, result) => {
        if (err){    
        return res.status(500).json({ error: "Erro ao verificar a senha"})
        }
        if (result){
        return res.json ({ message: "Login realizado"})
        } else {
        return res.json({ error: "Senha incorreta." })
        }
        });
    });
});     


//------------------------------------------------------------------------------------------------------------------------

const port = 3001;
app.listen(port, () => {
    console.log (`Servidor rodando na porta ${port}`);
});
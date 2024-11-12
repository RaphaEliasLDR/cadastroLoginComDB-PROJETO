const sqlite3 = require ('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize (() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        usuario TEXT UNIQUE NOT NULL,
        telefone TEXT,
        endereco TEXT,
        senha TEXT NOT NULL)
    `, (err) => {
        if (err) {
            console.error("Erro ao criar a tabela:", err);
        } else {
            console.log("Tabela de usuários criada com sucesso");
        }
    });
});  


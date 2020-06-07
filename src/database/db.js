//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()    //verbose() é um metodo que configura o sqlite3 avisando-o que quero ver mais informaçoes sobre algo no terminal

//criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") 

module.exports = db
//utilizar o objeto de bd, para nossas operações
db.serialize(() => {
    //com comandos SQL irei:
    //1.criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS place (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // //2.inserir dados na tabela
    // const query = `
    //     INSERT INTO place (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?)
    // `
    // const values = [
    //         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    //         "testName2",
    //         "testAddress",
    //         "testAddress2",
    //         "testState",
    //         "testCity",
    //         "testItems"
    //     ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }
    
    // db.run(query, values, afterInsertData)

    //3.consultar dados da tabela
    // db.all(`SELECT * FROM place`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

    //4.deletar dados da tabela
    // db.run(`DELETE FROM place WHERE id = ?`, [3], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })
})
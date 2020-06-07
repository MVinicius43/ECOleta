const express = require("express")
const server = express()

//pegar o db
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//pág inicial
//req: requisicao
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //inserir dados no db
    const query = `
         INSERT INTO place (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?)
     `
    const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do db
    db.all(`SELECT * FROM place WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com os dados do db
        return res.render("search-results.html", { places: rows, total: total })
    })

})

//ligar o servidor
server.listen(3000)
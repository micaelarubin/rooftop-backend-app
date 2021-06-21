// crear la aplicación
const express = require ("express")
const app = express ()
const path = require ("path")
const bodyParser = require ("body-parser")

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurar la aplicación
// http://localhost:3000/
//http://dominio.com/
// Redireccionamiento

app.get ("/", function (req, res) {
    let file = path.resolve ("src", "index.html")
    res.sendFile (file)
})

app.post ("/", function (req, res) {
    res.send (req.body)
})

app.get ("/viejo", function (req, res) {
    res.redirect ("/nuevo")
})

app.get ("/nuevo", function (req, res) {
    res.send ("Esta es la nueva ubicación")
})


// Puerto en el que se va a llamar a la aplicación
app.listen (3000)
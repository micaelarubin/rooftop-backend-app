// crear la aplicación
const express = require ("express")
const app = express ()
const path = require ("path")
const fs = require ("fs")
const bodyParser = require ("body-parser")
const products = require ("./products")

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurar la aplicación
// http://localhost:3000/
//http://dominio.com/
// Redireccionamiento

// http:/localhost:3000/products?page=1price_min=100price_max=1000
// Collection
app.get('/', function (req, res) {
    res.json()
})

app.get ("/products", function (req, res) {

    // let page = products.slice (0, 10)
    let results = [...products]

    if (Object.keys (req.query).length > 0) {
        // si tiene parámetros busco los resultados
        if (req.query.price_min) {
            results = results.filter (function (product) {
                return Number(product.price.replace ("$", "")) >= req.query.price_min
            })
        }

        if (req.query.price_max) {
            results = results.filter (function (product) {
                return Number(product.price.replace ("$", "")) <= req.query.price_max
            })
        }

    } else {
        results = products.slice (0, 10)
    }

    if (req.query.hasOwnProperty ("page")) {
            // si tiene paginado, pagino los resultados
        if (req.query.page) {
            if (req.query.page > 0) {
                start = req.query.page *10
                end = start + 10
                results = results.slice (start, end)
            }
        }
    }


    res.json(results)
})

// http:/localhost:3000/products/123
// Recurso -- uno específico de la colección
app.get ("/products/:id", function (req, res) {
    let product = products.find (function (product){
        return product.id == req.params.id
    })

    if (product) {
        return res.json (product)
    }
    res.status (404).send ({message: "This product does not exist"})

    res.json(product)
})

app.post ("/products", function (req, res) {
    console.log (req.body)

    let newProduct = {
        id: Date.now (),
        description: "",
        is_visible: false,
        ...req.body
    }

    // obtener el contenido (string)
    let content = fs.readFileSync ("./products.json", {encoding: "utf-8"})
    
    // interpretar el contenido como array/json
    let array = JSON.parse (content)
    
    // agregar al array
    array.push (newProduct)

    // volver a convertir a string
    content = JSON.stringify (array)

    // guardar el contenido en el archivo
    fs.writeFileSync ("./products.json", content)

    //if (true) {
     //   return res.status(403).json({message: "Cannot post"})
    //}

    console.log (newProduct)

    res.status(201).json({message: "Created", "id": newProduct.id})
})

app.patch ("/products/:id", function (req, res) {
    // buscar el dato que voy a editar
    // products.findIndex (function (product) {
    //     return product.id == req.params.id})

    let index = products.findIndex (product => product.id == req.params.id)
    
    if (index == -1) {
        return res.status (404).send ({mesagge: "This product does not exist"})
    }

    let old = products [index]

    // editar ese dato
    let product = {
        id: old.id,
        ...products [index],
        ...req.body
    }
    products [index] = product

    // guardar el dato nuevo (editado)
    // volver a convertir a string
    let content = JSON.stringify (products)
    // guardar el contenido en el archivo
    fs.writeFileSync ("./products.json", content)

    // responder 
    res.status (201).json ({message: "success"})



//    if (req.params.id == 45) {
//        return res.status(404).json({message: "Not found"})
//    }
    
//    res.json()
})

app.delete ("/products/:id", function (req, res) {

    let content = fs.readFileSync ("./products.json", {encoding: "utf-8"})
    
    // interpretar el contenido como array/json
    let products = JSON.parse (content)

    let index = products.findIndex (product => product.id == req.params.id)
    
    if (index == -1) {
        return res.status (404).send ({mesagge: "This product does not exist"})
    }

    products = products.filter (product => product.id != Number (req.params.id))

    content = JSON.stringify (products)

    fs.writeFileSync ("./products.json", content)

    res.status (201).json ({message: "success"})
})

// Puerto en el que se va a llamar a la aplicación
app.listen (3000)
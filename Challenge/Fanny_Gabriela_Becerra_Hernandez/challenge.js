const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('¡Hola mundo!')
})

app.post('/', (req, res) => {
    res.send('¡Hola mundo!')
})

app.put('/', (req, res) => {
    res.send('¡Hola mundo!')
})

app.delete('/', (req, res) => {
    res.send('¡Hola mundo!')
})

app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})
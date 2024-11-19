//Se importa express
const express = require('express');
//Se crea la aplicacion con express
const app = express();
//Desactivar la cabecera que indica que se está usando express
app.disable('x-powered-by');
//Traer el json de futaba
const futaba = require('./bunny-girl/futaba.json');

const PORT = process.env.PORT ?? 1234;

app.get('/bunny-girl/futaba', (req, res) => {
    res.json(futaba);
})

app.post('/bunny-girl', (req, res) => {
    let body = ''
    //Escuchar el evento data
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp =Date.now();
        res.status(201).json(data);
    })
})

//Esta es la ultima ruta que va a usar, 
//en este caso va atratar el error 404
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Foud</h1>')
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`);
})
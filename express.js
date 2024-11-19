//Se importa express
const express = require('express');
//Se crea la aplicacion con express
const app = express();
//Desactivar la cabecera que indica que se está usando express
app.disable('x-powered-by');
//Traer el json de futaba
const futaba = require('./bunny-girl/futaba.json');

const PORT = process.env.PORT ?? 1234;

//Middleware
app.use((req, res, next) => {
    console.log('primer middleware');
    //Trackear la request a la BD
    //Revisar si el usuario tiene cookies
    next()//Esto es esencial para continuar con las peticiones
})

app.use((req, res, next) => {
    if(req.method !== 'POST') return next();
    if(req.headers['content-type'] !== 'application/json') return next();

    let body = ''
    //Escuchar el evento data
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp = Date.now();
        //mutar la request y meter la info en el req.body
        req.body = data;
        next();
    })
})

app.get('/bunny-girl/futaba', (req, res) => {
    res.json(futaba);
})

app.post('/bunny-girl', (req, res) => {
    res.status(201).json(req.body);
})

//Esta es la ultima ruta que va a usar, 
//en este caso va atratar el error 404
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Foud</h1>')
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`);
})
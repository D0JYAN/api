//Se importa el modulo http
const http = require('node:http');
//Modulo para leer archivos
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

//Procesamiento de la solicitud
const processRequest = (req, res) => {
    console.log('request recibido: ', req.url);
    res.setHeader(
        'Content-Type', 'text/plain; charset=utf-8');
    //Discriminar url's
    if(req.url === '/') {
        res.statusCode = 200;//Todo correcto
        res.end('Binevenido a la página de home!');
    } else if (req.url === '/imagen_Futaba.png') {
        fs.readFile('img/Futaba.png', (err, data) => {
            if (err) {
                res.statusCode = 500;//Error interno
                res.end('Error al cargar la imagen');
            } else {
                //Envio de imagenes
                res.setHeader('Content-Type', 'image/png');
                res.statusCode = 200;//Todo correcto
                res.end(data);
            }
        })
    } else if (req.url === '/contacto') {
        res.statusCode = 200;//Todo correcto
        res.end('Binevenido a la página de contacto!');
    } else {
        res.statusCode = 404;//Recurso no encontrado
        res.end('Página no encontrada!');
    }
}

//Se crea el servidor
const server = http.createServer(processRequest)

//Se escucha en el puerto especificado, o el 1234 por defecto
server.listen(desiredPort, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${desiredPort}`);
})
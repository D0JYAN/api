const http = require('node:http');

//Con commonJS se puede importar un JSOn directamente
const futabaJSON = require('./bunny-girl/futaba.json');

const processRequest = (req, res) => {
    const { method, url } = req;
    
    switch (method) {
        case 'GET':
            switch (url) {
                case '/bunny-girl/futaba':
                    res.setHeader(
                        'Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(futabaJSON))
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('Pagina no encontrada');
            }
        case 'POST':
            switch (url) {
                case '/bunny-girl': {
                    let body = ''
                    //Escuchar el evento data
                    req.on('data', chunk => {
                        body += chunk.toString();
                    })
                    req.on('end', () => {
                        const data = JSON.parse(body);
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        res.end(JSON.stringify(data));
                    })
                    break;
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('404 Not Found');
            }
    }
}

const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log(`servidor activo en el puero http://localhost:1234`)
})
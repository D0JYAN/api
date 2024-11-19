const http = require('node:http');

//Con commonJS se puede importar un JSOn directamente
const futabaJSON = require('./bunny-girl/futaba.json');

const processRequest = (req, res) => {
    const { method, url } = req;
    
    switch (method) {
        case 'GET':
            switch (url) {
                case '/bunny-girl/fuataba':
                    res.setHeader(
                        'Content-Type', 'aplication/json; charset=utf-8');
                    return res.end(JSON.stringify(futabaJSON))
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('Pagina no encontrada');
            }
        case 'POST':
            switch (url) {
                case '/bunny-girl/':
                let body = '';
            }
    }
}

const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log(`servidor activo en el puero http://localhost:1234`)
})
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        fs.readFile('./public/html/index.html', 'utf8', (err, data) => {
            res.write(data);
            res.end();
        })
    }
}).listen(3000);
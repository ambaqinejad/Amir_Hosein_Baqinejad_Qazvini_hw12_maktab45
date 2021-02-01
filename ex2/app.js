const http = require('http');
const fs = require('fs')

http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile('./files/users.json', 'utf8', (err, data) => {
            res.write(data);
            res.end()
        })
    }
}).listen(3000);
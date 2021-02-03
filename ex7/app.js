const http = require('http');
const fs = require('fs');
const PORT = 3000;
const users = require('./users');

function readFileAndRender(path, res, encoding) {
    fs.readFile(path, encoding, (err, data) => {
        if (err) return console.log(err.message);
        res.write(data);
        res.end();
    })
}

function checkIfUserExists(parsedBody) {
    const sendedUsername = parsedBody.split('&')[0].split('=')[1];
    const sendedPassword = parsedBody.split('&')[1].split('=')[1];
    const user = users.find(u => u.userName === sendedUsername && u.password === sendedPassword)
    return typeof user !== 'undefined';
}

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        return readFileAndRender('./public/index.html', res, 'utf8');
    } else if (url === '/css/style.css' && method === 'GET') {
        return readFileAndRender('./public/css/style.css', res, 'utf8');
    } else if (url === '/js/main.js' && method === 'GET') {
        return readFileAndRender('./public/js/main.js', res, 'utf8');
    } else if (url === '/assets/images/bg.jpg' && method === 'GET') {
        return readFileAndRender('./public/assets/images/bg.jpg', res);
    } else if (url === '/' && method === 'POST') {
        let reqBody = [];
        let parsedBody;
        req.on('data', (chunk) => {
            reqBody.push(chunk);
        });
        req.on('end', () => {
            parsedBody = Buffer.concat(reqBody).toString();
            if (checkIfUserExists(parsedBody)) {
                return readFileAndRender('./public/loginSucccess.html', res);
            } else {
                return readFileAndRender('./public/loginFail.html', res);
            }
        })
    }
}).listen(PORT)
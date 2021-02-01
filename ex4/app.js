const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        return readFileAndRenderPage(res, './public/html/index.html')
    } else if (url === '/about' && method === 'GET') {
        return readFileAndRenderPage(res, './public/html/about.html')
    } else if (url === '/contact' && method === 'GET') {
        return readFileAndRenderPage(res, './public/html/contact.html')
    } else if (url === '/signIn' && method === 'GET') {
        return readFileAndRenderPage(res, './public/html/signIn.html')
    } else if (url === '/signUp' && method === 'GET') {
        return readFileAndRenderPage(res, './public/html/signUp.html')
    } else {
        return readFileAndRenderPage(res, './public/html/404.html')
    }
}).listen(3000);

function readFileAndRenderPage(res, path) {
    fs.readFile(path, 'utf8', (err, data) => {
        res.write(data);
        res.end()
    })
}
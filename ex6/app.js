const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/index.html')
    } else if (url === '/css/cardStyle.css' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/css/cardStyle.css')
    } else if (url === '/css/paginationStyle.css' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/css/paginationStyle.css')
    } else if (url === '/css/style.css' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/css/style.css')
    } else if (url === '/js/data.js' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/js/data.js')
    } else if (url === '/js/view.js' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/js/view.js')
    } else if (url === '/js/controller.js' && method === 'GET') {
        return readHtmlFileAndRenderPage(res, './public/js/controller.js')
    } else if (url === '/assets/images/avatar.png' && method === 'GET') {
        console.log(url);
        return readImageFileAndRender(res, './public/assets/images/avatar.png')
    } else {
        return readHtmlFileAndRenderPage(res, './public/404.html')
    }
}).listen(3000);

function readHtmlFileAndRenderPage(res, path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) return console.log(err.message)
        res.write(data);
        res.end()
    })
}

function readImageFileAndRender(res, path) {
    fs.readFile(path, (err, data) => {
        if (err) return console.log(err.message)
        res.write(data);
        res.end()
    })
}
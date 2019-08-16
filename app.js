/**
 * node1st
 * Created by min0727 on 2019-08-12
 */
const http = require('http');
const fs = require('fs');
var server = http.createServer(
    (request, response) => {
        fs.readFile('./index.html', 'UTF-8',
            (error;
    ))
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>omo</title></head>');
        response.write('<body><h1>私はオモです。</h1></body></html>');
        response.end();
    }
);
server.listen(3000);

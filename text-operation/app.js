/**
 * node1st
 * Created by min0727 on 2019-08-12
 */
const http = require('http');
const fs = require('fs');
var server = http.createServer(
    (request, response) => {
        fs.readFile('./index.html', 'UTF-8',
            (error, data) => {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
    }
);
server.listen(3000);

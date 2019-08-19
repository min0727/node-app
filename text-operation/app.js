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

                data = data.replace(/dummy_title/g, 'タイトル').replace(/dummy_content/g, '内容');
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
    }
);
server.listen(2000);
//なぜか3000が塞がっていた

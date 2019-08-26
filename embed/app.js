/**
 * node1st
 * Created by min0727 on 2019-08-12
 */
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
var server = http.createServer(
  (request, response) => {
    // メソッド名が変わっている
    var index_html = fs.readFileSync('./index.ejs', 'UTF-8');

    var data = ejs.render(index_html, {
      title: 'Index',
      content: 'サンプル',
    });
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.write(data);
    response.end();
  })

server.listen(2000);
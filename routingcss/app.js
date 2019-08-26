/**
 * node1st
 * Created by min0727 on 2019-08-12
 */
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
// メソッド名が変わっている
var index_html = fs.readFileSync('./index.ejs', 'UTF-8');
var other_html = fs.readFileSync('./other.ejs', 'utf8');
var style_css = fs.readFileSync('./style.css', 'utf8');
var server = http.createServer(
  (request, response) => {
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname) {
      case '/':
        var data = ejs.render(index_html, {
          title: 'Index',
          content: 'サンプル',
        });
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();
        break;

        case '/other':
          var data = ejs.render(other_html, {
            title: 'Other',
          content: 'sample',
        });
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();
        break;

      case '/style.css':
        // :を忘れるな
        response.writeHead(200, {
          'Content-Type': 'text/css'
        });
        response.write(style_css);
        response.end();
        break;

      default:
        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.end('not found...');
        break;

    }
  })

server.listen(2000);

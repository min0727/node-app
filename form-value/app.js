/**
 * node1st
 * Created by min0727 on 2019-08-12
 */
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");
// メソッド名が変わっている
var index_html = fs.readFileSync("./index.ejs", "UTF-8");
var other_html = fs.readFileSync("./other.ejs", "utf8");
var style_css = fs.readFileSync("./style.css", "utf8");
console.log("read");
const server = http.createServer((request, response) => {
  console.log('create');
  const url_parts = url.parse(request.url, true);
  console.log('parse');
  switch (url_parts.pathname) {
    case '/':
      console.log('pass');
      response_index(request, response);
      break;

    case '/other':
      response_other(request, response);
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
});
server.listen(2000);
console.log("start");

function response_index(request, response) {
  const message = 'これはindexです';
  console.log("pass");
  const data = ejs.render(index_html, {
    title: 'Index',
    // messageに引用符がついてないことに注意
    content: message,
  });
  response.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  response.write(data);
  response.end();
  console.log(data);
}

function response_other(request, response) {
  var message = "これはotherです";
  if (request.method == "POST") {
    // 自作のプロパティ
    var body = "";
    // データ受信時の処理
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      // bodyにformの値が全て含まれる
      var post_data = qs.parse(body);
      message += "あなたは「" + post_data.msg + "」と書きました";

      var content = ejs.render(other_html, {
        title: "Other",
        content: message,
      });
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.write(content);
      response.end();
    });
  } else {
    var msg = "ページが存在しません";
    var content = ejs.render(other_html, {
      title: "Other",
      content: msg,
    });
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(content);
    response.end();
  }
}
const HTTP = require('http');
const FS = require('fs');
const EJS = require('ejs');
const URL = require('url');
const QS = require('querystring');
// メソッド名が変わっている
const INDEX_HTML = FS.readFileSync('./index.ejs', 'UTF-8');
const OTHER_HTML = FS.readFileSync('./other.ejs', 'utf8');
const STYLE_CSS = FS.readFileSync('./css/bootstrap.min.css', 'utf8');
// console.log('read');
// /にアクセスすること
const SERVER = HTTP.createServer((request, response) => {
  // console.log('create');
  const url_parts = URL.parse(request.url, true);
  // console.log('parse');
  switch (url_parts.pathname) {
    case '/':
      // console.log('pass');
      responseIndex(request, response);
      break;

    case '/other':
      responseOther(request, response);
      break;

    case '/css/bootstrap.min.css':
      // :を忘れるな
      response.writeHead(200, {
        'Content-Type': 'text/css'
      });
      response.write(STYLE_CSS);
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
SERVER.listen(2000);
// console.log('start');

var data = {msg: 'メッセージはありません'};
const DATA2 = {
  '太郎': ['taro@yamada', '09-999-999', 'Tokyo'],
  '花子': ['hanako@flower', '080-888-888', 'Yokohama'],
  '幸子': ['sachi@happy', '070-777-777', 'Nagoya'],
  'イチロー': ['ichiro@sanfrancisco', '060-666-666', 'USA']
};

function responseIndex (request, response) {
  var body = '';
  if (request.method == 'POST') {
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      data = QS.parse(body);
      setCookie('msg', data.msg, response);
      writeIndex(request, response);
    });
  } else {
    writeIndex(request, response);
  }
}

function setCookie (key, value, response) {
  var cookie = escape(value);
  response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie (key, request) {
  var cookieData = request.headers.cookie != undefined ? request.headers.cookie : '';
  var data = cookieData.split(';');
  for (var i in data) {
    if (data[i].trim().startsWith(key + '=')) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
  return '';
}

function writeIndex (request, response) {

  const MSG = '伝言を表示します';
  // console.log('pass');
  const COOKIE_DATA = getCookie('msg', request);
  const CONTENT = EJS.render(INDEX_HTML, {
    title: 'Index',
    // messageに引用符がついてないことに注意
    content: MSG,
    data: data,
    cookieData: COOKIE_DATA
  });
  response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  response.write(CONTENT);
  response.end();
  // console.log(data);
}

function responseOther (request, response) {
  const message = 'これはotherです';
  // if (request.method == 'POST') {
  //   // 自作のプロパティ
  //   var body = '';
  //   // データ受信時の処理
  //   request.on('data', (data) => {
  //     body += data;
  //   });
  //   request.on('end', () => {
  //     // bodyにformの値が全て含まれる
  //     var post_data = QS.parse(body);
  //     message += 'あなたは「' + post_data.msg + '」と書きました';

  const content = EJS.render(OTHER_HTML, {
    title: 'Other',
    content: message,
    data: DATA2,
    filename: 'data-item.ejs'
  });
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.write(content);
  response.end();
}

// } else {
//   var msg = 'ページが存在しません';
//   var content = EJS.render(other_html, {
//     title: 'Other',
//     content: msg
//   });
//   response.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//   response.write(content);
//   response.end();
// }
// }
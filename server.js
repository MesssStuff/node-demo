var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if (!port) {
  console.log('请指定端口号');
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  console.log('查询字符串的路径为：' + pathWithQuery);

  
  if (path === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(
      '<!DOCTYPE>\n<html><head><link rel="stylesheet" href="/style.css">' +
        '</head><body>' + 
        '<h1>Hello World</h1>' +
        '<script src="/main.js"></script>' +
        '</body></html>'
    );
    response.end();
  } else if (path === '/style.css') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body {background-color: black;} h1 {color: white;}');
    response.end();
  } else if (path === '/main.js') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    response.write('alert("Hello")');
    response.end();
  } else {
    response.statusCode = 404;
    response.write('请求错误');
    response.end();
  }
});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port);

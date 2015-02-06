var express = require('express');
var app = express();
var http = require('http');

var logger = require('morgan');
var ejs = require('ejs');

//Application
app.set('title', 'My Site');
app.enable('trust proxy');
app.set('view engine', 'ejs');  

//logger
app.use(logger());

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){
	var contentPath = 'http://127.0.0.1:3000';
	var option = {
		contentPath : contentPath
	}
	res.render('index', option);
  	//res.render('layout', { title: 'The index page!' })
});

app.get('/api', function(req, res0){
  	http.get("http://127.0.0.1:4000/api", function(res,data) {
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    chunk = JSON.parse(chunk)
		    res0.render('layout', chunk)
		  });
	}).on('error', function(e) {
	  console.log("错误：" + e.message);
	});
});

app.listen(3000);
console.log('server start at 3000');
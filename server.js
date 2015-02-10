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


var contentPath = 'http://127.0.0.1:3000';
app.get('/', function(req, res){
	
	var option = {
		contentPath : contentPath,
		goodsList :[
			{
				goodsCode : '1000',
				goodsName : '商品1 goods1',
				goodsImg : 'imgs/1.jpg'
			},
			{
				goodsCode : '1001',
				goodsName : '商品2 goods2',
				goodsImg : 'imgs/2.jpg'
			}
		]
	}
	res.render('index', option);
});

app.get('/goodsInfoShow/:goodsCode', function(req, res){
	var goodsCode = req.params.goodsCode;
	console.info('-------------------------------------------------')
	console.info(goodsCode)
	var goodsCode1 = req.query.goodsCode;
	console.info(goodsCode1)
	var data = [
			{
				goodsCode : '1000',
				goodsName : '商品1 goods1',
				goodsImg : 'imgs/1.jpg'
			},
			{
				goodsCode : '1001',
				goodsName : '商品2 goods2',
				goodsImg : 'imgs/2.jpg'
			}
	];
	var option = {
		contentPath : contentPath,
		goodsName : '商品1'
	}
	res.render('goodsInfoShow', option);
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
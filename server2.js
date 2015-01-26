var express = require('express');
var app = express();

var logger = require('morgan');
var ejs = require('ejs');



//Application
app.set('title', 'My Site');
app.enable('trust proxy');
app.set('view engine', 'ejs');  

//logger
app.use(logger());


app.use(express.static(__dirname + '/public'));

app.get('/api', function(req, res){
   res.send({title: 'The index page!'});
});

app.listen(4000);
console.log('server start at 4000');
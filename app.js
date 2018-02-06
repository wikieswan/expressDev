const express = require('express')
const cookieParser = require('cookie-parser')
const proxy = require('http-proxy-middleware');
const Client = require('node-rest-client').Client;
const _ = require('lodash');
const app = express()
const port = 10000
const client = new Client();
const TARGET_SERVER = `http://www.example-inter.com`
const options = {
    target: TARGET_SERVER, // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/api' : '/api',     // rewrite path
    },
};
app.use(cookieParser());
app.use('/api', proxy(options));
app.get("/username", function(req, res, next) {
  console.log(req.cookies)
	const cookies = getCookiesString(req.cookies);
  console.log(cookies)
	const args = {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		}
	};
  	client.get(`${TARGET_SERVER}/api/username`,args ,function (data, response) {
  		/**
  			data type: { name: string }
  		*/
		res.send(`<p>hello ${data.name}</p>`);
	});
})
function getCookiesString(cookieObj) {
	var cookies = _.map(cookieObj, function(val, key) {
	    return key + "=" + encodeURIComponent(val);
	}).join("; ");
	return cookies;
}
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser." + new Date(), port, port)
  }
})






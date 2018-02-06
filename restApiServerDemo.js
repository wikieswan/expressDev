const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 11000
app.use(cookieParser());
app.get("/api/cookie", function(req, res, next) {
  res.cookie('rememberme', new Date().getTime(), { expires: new Date(Date.now() + 900000)});
  res.cookie('time', new Date().getTime(), { expires: new Date(Date.now() + 900000) });
  res.send({ ok: true });
  next();
})
app.get("/api/username", function(req, res, next) {
  console.log('==============');
  console.log('req: ', new Date());
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  res.send({ name: 'Jack' });
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser." + new Date(), port, port)
  }
})






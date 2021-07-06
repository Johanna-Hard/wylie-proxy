const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const app = express();
const port = 2000;
const proxy = httpProxy.createProxyServer({});
const wylieService = 'http://18.117.79.8:2004';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/rooms/:id', function(req, res) {
  res.render('index', { title: 'Airbnb Item Page', roomId: req.params.id });
});

//wylieService
app.get('/photos.js', function(req, res) {
  console.log('Request wylieService', req.method, req.url);
  proxy.web(req, res, {target: wylieService});
});

app.get('/photos/:listingId', function(req, res) {
  console.log('Request wylieService', req.method, req.url);
  proxy.web(req, res, {target: wylieService});
});

app.get('/host/:hostId', function(req, res) {
  console.log('Request wylieService', req.method, req.url);
  proxy.web(req, res, {target: wylieService});
});

app.listen(port, () =>  {
  console.log(`Proxy Server Listening at http://localhost:${port}`);
});
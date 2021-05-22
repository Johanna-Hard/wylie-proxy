const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const app = express();
const port = 2000;
const proxy = httpProxy.createProxyServer({});
const carsonService = 'http://localhost:2002';
const yosepService = 'http://localhost:5003';
const wylieService = 'http://localhost:2004';

// app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/rooms/:id', function(req, res) {
  res.render('index', { title: 'Airbnb Item Page', roomId: req.params.id });
});

//carsonService
app.get('/listings/:listingId', function(req, res) {
  console.log('Request carsonService', req.method, req.url);
  proxy.web(req, res, {target: carsonService});
});

app.get('/reviews/:listingId', function(req, res) {
  console.log('Request carsonService', req.method, req.url);
  proxy.web(req, res, {target: carsonService});
});

app.get('/bookings/:listingId', function(req, res) {
  console.log('Request carsonService', req.method, req.url);
  proxy.web(req, res, {target: carsonService});
});

//yosepService
app.all('/api/hostedBy/:id', function(req, res) {
  console.log('Request yosepService', req.method, req.url);
  proxy.web(req, res, {target: yosepService});
});

//wylieService
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
var path = require('path');
var webpack = require('webpack');
var express = require('express');
// var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8088, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listenning at http://localhost:8088');
})

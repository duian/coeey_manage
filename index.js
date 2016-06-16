const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('./middleware/cors');
const db = mongoose.connection;
const models = join(__dirname, './models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const products = require('./controllers/products');
db.on('error', console.error);
db.once('open', () => {
  console.log('connect');
});
mongoose.connect('mongodb://localhost/products');

app.use(cookieParser());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.post('/api/user', (req, res) => {
  res.send({
    status: true,
  });
});

app.param('id', products.load);

app.get('/api/product', products.index);

app.post('/api/product', products.create);

app.put('/api/product/:id', products.update);

app.delete('/api/product/:id', products.destroy);

app.listen(8089, (err) => {
  if (err) {
    console.log(err);
    return null;
  }

  return console.log('8089 port starting');
});

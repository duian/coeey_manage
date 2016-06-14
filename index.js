const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('./middleware/cors');

const db = mongoose.connection;
const models = join(__dirname, './models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const product = require('./controllers/products');
db.on('error', console.error);
db.once('open', () => {
  console.log('connect');
});

mongoose.connect('mongodb://localhost/products');
app.use(cors);

app.post('/api/user', (req, res) => {
  res.send({
    status: true,
  });
});

app.get('/api/product', product.index);

app.post('/api/product', product.create);

app.listen(8089, (err) => {
  if (err) {
    console.log(err);
    return null;
  }

  return console.log('8089 port starting');
});

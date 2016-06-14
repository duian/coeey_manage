const mongoose = require('mongoose');
// const Product = require('../models/product');
// require('../models/product');
const Product = mongoose.model('Product');

exports.index = (req, res) => {
  Product.list({})
  .then((results) => {
    const length = results.length;
    const records = results.map((record, index) => {
      record.index = index;
      return record;
    });
    res.send({
      length,
      records,
    });
  });
};

exports.create = (req, res) => {
  res.send({});
};

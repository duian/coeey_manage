const mongoose = require('mongoose');
// const Product = require('../models/product');
// require('../models/product');
const Product = mongoose.model('Product');
function removeEmptyProperty(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
}

exports.load = (req, res, next, id) => {
  Product.load(id).then((data) => {
    try {
      req.product = data;
      if (!req.product) return next(new Error('Product not found'));
    } catch (err) {
      return next(err);
    }
    return next();
  });
};

exports.index = (req, res) => {
  const label = req.query.label.trim();
  const name = req.query.name.trim();
  const code = req.query.code.trim();
  const page = parseInt(req.query.page, 10) - 1;
  const limit = parseInt(req.query.limit, 10);
  const params = removeEmptyProperty({
    label,
    name,
    code,
  });
  const options = {
    params,
    page,
    limit,
  };
  Product.list(options)
  .then((data) => {
    const length = data.length;
    const records = data;
    res.send({
      length,
      records,
    });
  });
};

exports.create = (req, res) => {
  res.send({});
};

exports.destroy = (req, res) => {
  const product = req.product;
  console.log('product', product);
  product.remove();
  res.send({ status: true });
};

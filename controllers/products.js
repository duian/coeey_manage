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

function handleBodyParam(body) {
  const code = body.code ? body.code.trim() : '';
  const cost = body.cost ? parseInt(body.cost, 10) : 0;
  const count = body.count ? parseInt(body.count, 10) : 0;
  const format = body.format ? body.format.trim() : '';
  const label = body.label ? body.label.trim() : '';
  const name = body.name ? body.name.trim() : '';
  return {
    code,
    cost,
    count,
    format,
    label,
    name,
  };
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
  const body = req.body;
  const options = handleBodyParam(body);
  const product = new Product(options);
  product.save((err, result) => {
    if (err) {
      res.send({ err });
    }
    res.send({ status: true, result });
  });
};

exports.update = (req, res) => {
  const body = req.body;
  const options = handleBodyParam(body);
  const product = Object.assign(req.product, options);
  product.save((err, result) => {
    if (err) {
      res.send({ err });
    }
    res.send({ status: true, result });
  });
};

exports.destroy = (req, res) => {
  const product = req.product;
  product.remove();
  res.send({ status: true });
};

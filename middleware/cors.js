module.exports =  function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8088');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

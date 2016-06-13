const express = require('express');
const app = express();
const cors = require('./middleware/cors');

app.use(cors);

app.post('/api/user', (req, res) => {
  res.send({
    status: true,
  });
});

app.get('/api/product', (req, res) => {
  res.send({
    length: 10,
    records: [
      {
        id: 1,
        name: '神仙水',
      },
      {
        id: 2,
        name: '神仙水',
      },
    ],
  });
});

app.listen(8089, (err) => {
  if (err) {
    console.log(err);
    return null;
  }

  return console.log('8089 port starting');
});

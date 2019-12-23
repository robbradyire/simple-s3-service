import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.get('/', function(_req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});

const express = require('express');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  console.log('Hello, World from a Middleware!');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World from my server!');
});

app.listen(port, () => {
  console.log(`Server has started listening to port: ${port}`);
});

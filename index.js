const express = require('express');
const { json } = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(json());

app.post('/data', (req, res) => {
  const data = req.body;

  console.log(data);

  res.json({
    status: 200,
  });
});

app.listen(8000);
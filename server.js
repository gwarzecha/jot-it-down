const express = require('express');
const fs = require('fs')


const app = express();
const port = process.env.port || 3003;

app.get('/', (req, res) => {
  res.send('Working');
}
)

app.listen(port, () => {
  console.log(`Server now on port ${port}`);
})
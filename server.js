const express = require('express');
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

// instantiantes express server
const app = express();
const PORT = process.env.PORT || 3003;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//  middleware that specifies root directory serving static assets
app.use(express.static('public'));


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// listen method for server
app.listen(PORT, () => {
  console.log(`Server now on port http://localhost:${PORT}`);
})
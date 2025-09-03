
const morgan = require('morgan');
const express = require('express');

const PORT = 3000;
const app = express();

// Middleware
app.use(morgan('dev'));

// Routes

app.get('/', (req, res) => {
    res.render('home.ejs');
})
app.listen(PORT, () => {
  console.log('Listening on port 3000');
});

const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Models
const Fruit = require('./models/fruit.js')

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
})

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);

    res.render('fruits/show.ejs', {
        fruit: foundFruit,
    });
});

app.post('/fruits', async (req, res) => {
    console.log(req.body);
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('/fruits')
})

app.listen(PORT, () => {
    console.log('Listening on port 3000');
});

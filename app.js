const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const submitted = false;
const yahooFinance = require('yahoo-finance');
const Chart = require('chart.js');

// env variables
require('dotenv').config();

// mongodb Position model
const Position = require('./model/Position');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for the POST request

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/purchaseForm', (req, res) => {
    res.render('purchaseForm', { submitted: false });
});

app.post('/purchaseForm', (req, res) => {
    let { ticker, sharePrice, shares, date } = req.body;
    ticker = ticker.trim();
    sharePrice = sharePrice;
    shares = shares;
    date = date;

    if (ticker == "" && sharePrice == "" && shares == "" && date == "") {
        // Handle empty form
    } else {
        const newPosition = new Position({
            ticker: ticker,
            sharePrice: sharePrice,
            shares: shares,
            date: date
        });

        newPosition.save()
            .then(() => {
                // Set submitted to true to display the island message
                res.render('purchaseForm', { submitted: true });
            })
            .catch(err => {
                console.error(err);
                // Handle error
            });
    }
});









app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

/** Database Connection */
require('./config/db');

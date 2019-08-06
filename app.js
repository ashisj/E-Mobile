const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// routes
const routes = require('./api/routes/')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// route Path
app.use('/api/products',routes.product);

app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    console.log(err)
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong'
    });
});

module.exports = app;
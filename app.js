const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
//const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./api/models/index').db // loads our connection to the mongo database
const passport = require('./passport');
const app = express();

// routes
const routes = require('./api/routes/')

// Middleware
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
);

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")))

// route Path
app.use('/auth',routes.user);
app.use('/api/products',routes.product);
app.use('/api/cart',routes.cart);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong'
    });
});

module.exports = app;
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Listen to port
const port = process.env.PORT || 8080;
//express app
const app = express();

//request logger in console
app.use(morgan('dev'));

// To serve static files
app.use(express.static('views'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
// The default engine extension to use
app.set('view engine', 'ejs');
app.use(session({
    secret: 'justasecret',
    resave:true,
    saveUninitialized: true
}));
require('./app/routes.js')(app);
app.listen(port);
console.log(`Server running on ${port} port`);
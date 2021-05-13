var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var session = require("express-session")
var fs = require('fs');
var path = require('path');
require('dotenv/config');

// This should refer to the local React and gets installed via `npm install` in
// the example.
var reactViews = require('express-react-views');

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
// Set up mongoose connection
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const username = 'Drake';
const password = 'Q4TJjMADzM81Ywob'
const db_name = 'UserData'
var mongo_db_url = `mongodb+srv://${username}:${password}@userdata.ktegw.mongodb.net/${db_name}?retryWrites=true&w=majority`

var mongoDB = process.env.MONGODB_URI || mongo_db_url
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

var router = require("./routes/router")
let usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jsx")
app.engine('jsx', reactViews.createEngine());

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// handles server side sessions
app.use(session({ 
    secret: "B1ZIwibv0LxR%g*0AeH!NzjtF48fng6CNq7qcX", 
    resave: true,
    name: 'SESSION_ID',
    saveUninitialized: true }))

app.use(express.static(path.join(__dirname, "public")))

app.use("/", router)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error", {title: "Error"})
})

app.use((req, res, next) => {
    const render = res.render;
    const send = res.send;
    res.render = function renderWrapper(...args) {
        Error.captureStackTrace(this);
        return render.apply(this, args);
    };
    res.send = function sendWrapper(...args) {
        try {
            send.apply(this, args);
        } catch (err) {
            console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
        }
    };
    next();
});

module.exports = app

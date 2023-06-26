require('dotenv').config()
const express = require('express');

const app = express();

const path = require('path');

const ejs = require('ejs');

const expressLayout = require('express-ejs-layouts');

const PORT = process.env.PORT || 3300

const mongoose = require('mongoose');

const session = require('express-session');

const flash = require('express-flash');

const MongoDBStore = require('connect-mongodb-session')(session);




//database connection
const url = 'mongodb://127.0.0.1:27017/pizza';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

 var conn = mongoose.connection;
 
conn.on("connected",function(){
  console.log("Connection established...");
})

conn.on("disconnected",function(){
  console.log("disConnection...");
})

 
conn.on('error', console.error.bind(console, 'connection error'));

conn.once('open', function(){
  console.log('Connection established..');  

})


//session store

let MongoStore = new MongoDBStore({

             //mongooseConnection: conn,
             uri: 'mongodb://127.0.0.1:27017/pizza',
             collection:'sessions',

            })


// Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoStore ,
  saveUninitialized: false,   
  cookie: { maxAge: 1000 * 60 * 60 * 24} //24 hours
}));


app.use(flash());
// Assets
app.use(express.static('public'));

app.use(express.json());

// global use

app.use((req, res, next) => {
  
     res.locals.session = req.session;
     
     next();
  
})

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
   
});
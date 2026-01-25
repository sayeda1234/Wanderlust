
    require('dotenv').config();


const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const { stat } = require('fs');
const listing=require('./routes/listing');
const reviews=require('./routes/review');
const user=require('./routes/user');
const session=require('express-session');
const MongoStore = require('connect-mongo').default;
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');

main().then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));

const store = MongoStore({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.get('/',(req,res)=>{
    res.send("hi this is sayeda");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    next();
});

app.use('/listings',listing);
app.use('/listings/:id/reviews',reviews);
app.use('/',user);


// 404 handler
app.use((req, res, next) => {
    next(new ExpressError( 404,"Page Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');
const postRouter = require("./router/postRouter");

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(helmet());

// rate limiter 
const limiter = rateLimit({
    max:3,
    windowMs : 1*5*1000,
    message :'Only 3 request can make in 5 seconds'
});
app.use('/api',limiter);

// sanitize 
app.use(mongoSanitize());
app.use(xss());

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);

module.exports = app;


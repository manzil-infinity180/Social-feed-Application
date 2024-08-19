const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const postRouter = require("./router/postRouter");

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(helmet());
app.use(express.static("public"));
// rate limiter 
const limiter = rateLimit({
    max:10,
    windowMs : 1*1000,
    message :'Only 3 request can make in 5 seconds'
});
app.use(cors({
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
}))
app.use('/api',limiter);

// sanitize 
app.use(mongoSanitize());
app.use(xss());

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'})
    res.sendFile(__dirname+'/public/index.html');
});

app.use('/api/user',userRouter);
app.use('/api/post',postRouter);

module.exports = app;


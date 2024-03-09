const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const app = require("./app");
const PORT = process.env.PORT || 5006

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
mongoose.connect(db).then(()=>{
    console.log("successfully connected to db");
});


app.listen(PORT,()=>{
    console.log("Running on port "+PORT);
})




// jshint esversion:6
const express = require("express");

const {logReqRes} =  require("./middlewares");
const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user');    

const app = express();
const port=3000;

connectMongoDb("mongodb://127.0.0.1:27017/rest-api-db").then(()=>console.log("MongoDB connected"));

app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));
app.use("/api/users",userRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
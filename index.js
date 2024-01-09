// jshint esversion:6
const express = require("express");
const fs= require("fs");
const mongoose = require("mongoose");
const app = express();
const port=3000;

const userSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName :{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String
    }
},{timestamps:true});

mongoose
.connect('mongodb://127.0.0.1:27017/rest-api-db')
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log("Mongo ERR",err)); 

const User = mongoose.model('user',userSchema);
app.use(express.urlencoded({extended:false}));

app.get("/users",async(req,res)=>{
    const allDBusers = await User.find({});
    const html=`
    <ul>
    ${allDBusers
        .map((user)=>`<li>${user.firstName} - ${user.email}</li>`)
        .join("")}
    </ul>
    `
    res.send(html);
});

app.get("/api/users",async(req,res)=>{
    const allDBusers = await User.find({});
    return res.json(allDBusers);
});

app
.route("/api/users/:id")
.get(async(req,res)=>{
    const user= await User.findById(req.params.id)
    return res.json(user);
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"abc"});
    return res.json({msg:"success"});
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"success"});
})

app.post("/api/users",async(req,res)=>{
    const body=req.body;
   const result = await User.create({
    firstName :body.first_name,
    lastName :body.last_name,
    email :body.email,
    jobTitle :body.job_title
   });
   console.log("result",result);
   return res.status(201).json({message:"Success"});
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
// jshint esversion:6
const express = require("express");
const users = require("./MOCK_DATA.json")
const fs= require("fs");
const app = express();
const port=3000;

app.use(express.urlencoded({extended:true}));

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
});

app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    
        return res.json({id:users.length});
    })
})
app.delete("/api/users",(req,res)=>{
    
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
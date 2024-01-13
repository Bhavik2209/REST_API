const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function handleGetUserById(req,res){
    const user= await User.findById(req.params.id)
    return res.json(user);
}

async function handlePatchUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:"abc"});
    return res.json({msg:"success"});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"success"});
}

async function handleCreateNewUser(req,res){
    const body=req.body;
    const result = await User.create({
     firstName :body.first_name,
     lastName :body.last_name,
     email :body.email,
     jobTitle :body.job_title
    });
    console.log("result",result);
    return res.status(201).json({message:"Success",id:result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}
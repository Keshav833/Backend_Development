const User = require('../models/user');
const express = require('express');

async function handleCreateUserasync(req, res){
    const body  = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.email ||
        !body.lastName ||
        !body.jobTitle 


    ){
        return res.status(400).json({ msg : "All fields are required"});
    }
    const result =  await User.create({
        firstName :body.firstName,
        lastName :body.lastName,
        email :body.email,
        gender : body.gender,
        jobTitle : body.jobTitle,
    })
    console.log("Result:", result);
    return res.status(201).json({msg: "Success"})
}

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});

    res.setHeader('Content-Type','application/json');
    return res.json(allUsers)

}

async function handleGetUserById(req,res){
   const user = await User.findById(req.params.id);
   if(!user){
    return res.status(404).json({msg: "USer not found"})
   }
   
    return res.json(user)
    }

async function handleUpdateUser(req,res){
        //Update user logic here
        await User.findByIdAndUpdate(req.params.id, {lastName: "Updated"});
        return res.json({status: "Success"});

    }

async function handleDeleteUser(req,res){
        //Delete user logic here
        await User.findByIdAndDelete(req.params.id, )
        return res.json({status: "Pending"});
    }

module.exports = {
    handleCreateUserasync,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
}
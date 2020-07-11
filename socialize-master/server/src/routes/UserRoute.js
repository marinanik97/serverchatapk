const express = require('express');
const bcrypt = require('bcryptjs');


const UserModel = require('../db/models/User')
const { AuthMiddleware } = require('../middleware/Auth');

const UserRouter = new express.Router();

UserRouter.post('/signup', async (req, res) =>{
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = new UserModel({...req.body, password: hashedPassword});
        user.save().then(user => {
            res.send(user);
        }, (e) => {
            res.status(400).send(e);
        });
})

UserRouter.post('/login', async (req, res) =>{
    try{
        const user = await UserModel.findByCredentials(req.body.email, req.body.password);
        res.send({token: await user.generateAuthToken(), id: user._id});
    }catch (e) {
        res.status(400).send({error: "Login failed"});
    }
})


UserRouter.get('/users/me', AuthMiddleware , async (req, res)=>{
    const user = await UserModel.findById(req.user.id).populate('posts')
    res.send(user);
})

UserRouter.get('/users', AuthMiddleware ,async (req,res)=>{
    const users = await UserModel.find({ _id: {$ne: req.user._id}})
    res.send(users);
})


module.exports = {
    UserRouter
};

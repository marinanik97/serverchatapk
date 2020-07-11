const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

const UserModal = require('../db/models/User')
const PostModal = require('../db/models/Post')
const {AuthMiddleware} = require('../middleware/Auth');
const PostRouter = new express.Router();

PostRouter.post('/posts/new', AuthMiddleware, async (req, res, next) => {
    const post = new PostModal({text: req.body.text, user: req.user._id})
    await post.save();
    const user = await UserModal.findOneAndUpdate({ _id: req.user._id },
        { $push: { posts: post.id } }, {new: true}
    )
    res.send(post);

})

PostRouter.get('/posts', AuthMiddleware, async (req, res, next) => {
    const posts = await PostModal.find().populate('user')
    res.send(posts);
})

PostRouter.get('/posts/like/:id', AuthMiddleware, async function (req, res) {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
        res.status(404).send("Link Not Found - invalid id");
    }
        try{
           const post = await PostModal.findOneAndUpdate({ _id: req.params.id },
                { $addToSet: { likes: req.user._id } }, {new: true}
            )
            res.send(post);
        }catch (e) {
            res.send(e);
        }



})

PostRouter.get('/posts/dislike/:id', AuthMiddleware, async function (req, res) {
    try{
        const post = await PostModal.findOneAndUpdate( {_id: req.params.id}, { $pullAll: {likes: [req.user._id] } }, { new: true })
        res.send(post);
    }catch (e) {
        res.send(e);
    }
})


module.exports = {
    PostRouter
};

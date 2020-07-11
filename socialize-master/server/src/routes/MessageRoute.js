const express = require('express');
const MessageModal = require('../db/models/Message')

const { AuthMiddleware } = require('../middleware/Auth');
const MessageRoute = new express.Router();

MessageRoute.post('/messages/new', AuthMiddleware, async (req, res, next) => {
    const message = new MessageModal({text: req.body.text, userSender: req.user._id, userAccepter: req.body.user})
    await message.save();
    res.send(message);
})

MessageRoute.get('/messages/:id', AuthMiddleware, async (req, res, next) => {
    const messages = await MessageModal.find({ $or: [{userAccepter: req.params.id, userSender: req.user._id}, {userSender: req.params.id, userAccepter: req.user._id}]}).populate('userAccepter').populate('userSender');
    res.send(messages);
})


module.exports = {
    MessageRoute
};
const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleWare/auth');
const router = express.Router();

router.post('/message/:to', auth, async ( req, res ) => {
    const message = new Message({
        message: req.body.message,
        from: req.user.id,
        to: req.params.to
    })
    try {
        const saveMessage = await message.save();
        res.status(200).json(saveMessage);
    } catch ( e ) {
        res.json({ message: e.message})
    }
})

router.patch('/message/:to/:messageId',  auth, async ( req, res ) => {
    try {
        const updatedMessage = await Message.updateOne({
                from: req.user.id,
                to: req.params.to,
                _id: req.params.messageId,
                user: req.user._id
            },
            {
                $set: {
                    message: req.body.message
                }
            }
        )
        res.status(200).json({ message: "Message updated" });
    } catch ( e ) {
        res.json({ message: e.message})
    }
})

router.delete('/message/:to/:messageId', auth, async ( req, res ) => {
    try {
        const deletedMessage = await Message.findOneAndDelete({
            from: req.user.id,
            to: req.params.to,
            _id: req.params.messageId,
            user: req.user._id
        })
        if (!deletedMessage) {
            res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message removed' });
    } catch ( e ) {
        res.json({ message: e.message });
    }
})

router.get('/message/:to', auth, async ( req, res ) => {
    try {
        const getAllMessages = await Message.find({
            from: req.user.id,
            to: req.params.to
        })
        res.status(200).json(getAllMessages);
    } catch ( e ) {
        res.json({ message: e.message });
    }
})

module.exports = router;
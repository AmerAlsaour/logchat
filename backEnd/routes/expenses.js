const express = require('express');
const router = express.Router();
const expense = require('../models/Expense');
const auth = require('../middleWare/auth');
const Expense = require('../models/Expense');


router.get('/expense', auth, async ( req, res ) => {
    try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses)
    } catch ( e ) {
        res.status(400).json({ message: e });
    }
});

router.post('/expense', auth, async ( req, res ) => {
    const expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        user: req.user.id
    })
    try {
        const saveExpense = await expense.save();
        res.status(200).json(saveExpense);
    } catch ( e ) {
        res.json({ message: e });
    }
});

router.patch('/expense/:expenseId', auth, async ( req, res ) => {
    try {
        const updateExpense = await Expense.updateOne({
            _id: req.params.expenseId,
            user: req.user._id
        },
            {
                $set: {
                    description: req.body.description,
                    amount: req.body.amount
                }
            }
        );
        res.status(200).json({ message: "Expense updated" });
    } catch ( e ) {
        res.json({ message: e });
    }
})

router.delete('/expense/:expenseId', auth, async (req, res) => {
    try {
    const removedExpense = await Expense.findOneAndDelete({
        _id: req.params.expenseId,
        user: req.user._id
    });
    if (!removedExpense) {
        return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense removed" });
    } catch (e) {
    res.status(500).json( e.message );
    }
});

module.exports = router;
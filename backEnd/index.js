const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expensesRoute = require('./routes/expenses');
const authRoute = require('./routes/auth');
const chatRoute=require('./routes/chat')
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
app.use('/api', expensesRoute);
app.use('/api', authRoute);
app.use('/api', chatRoute);



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
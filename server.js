const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

const PORT = process.env.PORT || 5000;


app.use('/api/users',require('./routes/user'));
app.use('/api/productGroup',require('./routes/productGroup'));
app.use('/api/grocery',require('./routes/grocery'));

app.listen(PORT, () => {
     console.log(`server listens now ${PORT}`);
});
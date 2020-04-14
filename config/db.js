const mongoose = require('mongoose');

const config = require('config');

const dbURI = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(dbURI, 
        { useNewUrlParser:true,
          useCreateIndex:true,
          useFindAndModify:false})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectDB;
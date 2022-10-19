const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

const connectToMongo = async () => { 
    await mongoose.connect(DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
        console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongo;

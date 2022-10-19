const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL.toString();

const connectToMongo = () => {
    mongoose.connect(
        DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) throw err;
            console.log("Connected to MongoDB");
        }
    )
};

module.exports = connectToMongo;

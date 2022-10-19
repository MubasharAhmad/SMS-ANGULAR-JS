const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

const connectToMongo = async () => {
    await mongoose.connect(
        DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    const db = mongoose.connection;
    db.once("open", function () {
        console.log("Connected to MongoDB");
    });
    db.on("error", function (err) {
        console.log(err);
    });
};

module.exports = connectToMongo;

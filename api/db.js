const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/SMSdb?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// const mongoURI = "mongodb+srv://mubasharcs34:mubasharcs34@samplecluster.6gxbrbl.mongodb.net/SMSdb?retryWrites=true&w=majority";

const connectToMongo = async () => {
    await mongoose.connect(
        mongoURI,
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

const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/SMSdb?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// const mongoURI = "mongodb+srv://mubasharcs34:mubasharcs34@samplecluster.6gxbrbl.mongodb.net/SMSdb?retryWrites=true&w=majority";

const connectToMongo = async () => { 
    await mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongo;

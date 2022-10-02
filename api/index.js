const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
 
connectToMongo();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// available routes
app.use("/api/auth", require("./routes/auth"));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


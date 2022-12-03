const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
dotenv.config();

const connectToMongo = require("./db");

connectToMongo();

// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/other", require("./routes/other"));
app.use("/api/principal", require("./routes/principal"));
app.use("/api/subject", require("./routes/subject"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


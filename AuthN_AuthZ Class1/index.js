const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

// Importing and Mounting the Routes
const user = require("./routes/user");
app.use("/api/v1", user);

// Activitating the Server
app.listen(PORT, () => {
    console.log(`App is running at Port no. ${PORT}.`);
})
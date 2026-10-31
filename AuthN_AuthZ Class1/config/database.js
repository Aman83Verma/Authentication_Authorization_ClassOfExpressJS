const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = async () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connected Successfully.");
        })
        .catch((error) => {
            console.log("DB Connection Issue!");
            console.error(error);
            process.exit(1);
        })
}
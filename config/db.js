const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MYURL);

module.exports = {
    connection
}
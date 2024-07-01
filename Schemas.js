const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
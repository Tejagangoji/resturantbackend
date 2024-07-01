const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const { User } = require('./Schemas');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://user:user@cluster0.u1ajygu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Mongo db is connected"))

app.get("/", async (req, res) => {
    res.send("dshkb")
})

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const alreadyuser = await User.findOne({ userid: username });
        if (alreadyuser) {
            return res.status(400).json("user already there")
        }
        const user = User({
            userid: username,
            email,
            password
        });
        await user.save();
        return res.status(200).json("registration sucessfully");
    } catch (error) {
        return res.status(500).json(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ userid: username });
        if (user) {
            if (password === user.password) {
                return res.status(200).json("Loign sucessfully");
            }
            else {
                return res.status(405).json("Wrong password");
            }
        }
        return res.status(404).json("User not found");
    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(5000, () => console.log("Server is running"));
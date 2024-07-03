const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const { User, Product } = require('./Schemas');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://user:user@cluster0.u1ajygu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Mongo db is connected"))

app.get("/", async (req, res) => {
    res.send("dshkb")
})


//user register
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


//user login
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

//admin login
app.post('/adminlogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === "Admin" && password === "admin123") {
            return res.status(200).json("Loign sucessfully");
        }
        else {
            return res.status(405).json("Wrong Credentials");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})

//add a product by admin
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, price, category } = req.body;
        const product = Product({
            name,
            image,
            price,
            category
        });
        await product.save();
        return res.status(200).json("Product added succesfully");
    } catch (error) {
        return res.status(500).json(error);
    }
})

//get the all products
app.get('/getproducts', async (req, res) => {
    try {
        return res.status(200).json(await Product.find());
    } catch (error) {
        return res.status(500).json(error);
    }
});

//delete a product
app.delete('/deleteproduct/:productid', async (req, res) => {
    try {
        const {productid} = req.params;
        await Product.findByIdAndDelete(productid);
        return res.status(200).json("Deleted sucessfully")
    } catch (error) {
        return res.status(500).json(error);
    }
});




app.listen(5000, () => console.log("Server is running"));
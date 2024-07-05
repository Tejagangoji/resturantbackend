const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const { User, Product, Cart } = require('./Schemas');

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
                return res.status(200).json(user.id);
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

//add to cart
app.post('/addtocart', async (req, res) => {
    try {
        const { userid, productid, quantity } = req.body;
        const cart = Cart({
            userid,
            productid,
            quantity
        });
        await cart.save();
        return res.status(200).json("added in to the cart");
    } catch (error) {
        return res.status(500).json("server error");
    }
})


//remove from cart
app.delete('/removefromcart/:id/:userid', async (req, res) => {
    try {
        await Cart.deleteOne({ userid: req.params.userid, productid: req.params.id });
        return res.status(200).json("removed sucessful")
    } catch (error) {
        return res.status(500).json("server error");
    }
})

//get the cart
app.get('/getthecart/:userid', async (req, res) => {
    try {
        const cart = await Cart.find({ userid: req.params.userid }).populate("productid");
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json("server error");
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
        const { productid } = req.params;
        await Product.findByIdAndDelete(productid);
        return res.status(200).json("Deleted sucessfully")
    } catch (error) {
        return res.status(500).json(error);
    }
});




app.listen(5000, () => console.log("Server is running"));
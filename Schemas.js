const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
});


const cartSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: String, required: true },
});


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, require: true },
    category: { type: String, require: true },
});

const Cart = mongoose.model("Cart", cartSchema);
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { User, Product, Cart };
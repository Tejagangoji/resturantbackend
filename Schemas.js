const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }
});

const cartSchema = new mongoose.Schema({
    items: [{ productid : { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: {type: String, default: 1}}]
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, require: true },
    category: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = { User, Product, Cart };
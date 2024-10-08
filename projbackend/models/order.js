const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductInCartSchema);

const OrderSchema = new mongoose.Schema({
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Processing",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };

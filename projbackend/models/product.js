const mongoose = require("mongoose");
const{ObjectID}= mongoose.Schema;

const productSchema = new mongoose.Schema({

    name: {
        type:String,
        maxlength:32,
        trim:true,
        required:true

    },
    description: {
        type:String,
        maxlength:2000,
        required:true,
        trimtrue

    },
    price: {
        type:Number,
        maxlength: 32,
        required: true,
        trim: true

    },
    category:{
        type: ObjectID,
        ref: "Category",
        required:true

    },
    stock:{
        type: Number,
    },

    soldUnits:{
        type: Number,
        default:0,
        },

    photo:{
        data: Buffer,
        contentType: String
        
    },

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
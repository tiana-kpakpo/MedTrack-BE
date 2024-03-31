import mongoose from "mongoose";

const drugSchema = mongoose.Schema({
    drugName: {
        type: String,
        required: [true, 'Please add a drug name']
    },

    description: {
        type: String,
        required: [true, 'Please add a description']

    },

    unitPricing: {
        type: String,
        required: [true, 'Please add a unit of pricing']
    },

    code: {
        type: String,
        required: [true, 'Please add a code'],
        unique: true,
    },

    price: {
        type: Number,
        required: [true, 'Please add a price']
    }, 

},

{
    timestamps: true,
})

const Drug = mongoose.model('Drug', drugSchema);

export default Drug; 
import mongoose from "mongoose";

const labSchema = mongoose.Schema({
    labItem: {
        type: String,
        required: [true, 'Please add a Lab Item']
    },

    labType: {
        type: String,
        required: [true, 'Please add a Lab Type']
    },

    category: {
        type: String,
        required: [true, 'Please add a Category'] 
    },

    subCategory: {
        type: String,
        required: [true, 'Please add a sub Category']
    },

    code: {
        type: String,
        required: [true, 'Please add a code'],
        unique: true,
    },

    price: {
        type: Number,
        required: [true, 'Please add Lab Price']
    }


},{
    timestamps: true
})

const Lab = mongoose.model('Lab', labSchema);

export default Lab; 
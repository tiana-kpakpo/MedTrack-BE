import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 60,

    },

    
    email: {
        type: String,
        required: true,
        maxlength: 255,
    },

    password: {
        type: String,
        required: true,
        maxlength: 255,
    },

},

{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

export default User; 
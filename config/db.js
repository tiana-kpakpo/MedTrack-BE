 import mongoose from "mongoose";

 export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_STRG)

        console.log(`MongoDB Connected Successfully`)
    } catch (error) {
        console.error(error, 'Unable to connect to DB')
        process.exit(1);
        
    }
 }
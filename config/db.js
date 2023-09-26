import mongoose from "mongoose";



const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.CONNECTIONURL}`);
        console.log("MongoDB connected...🤩");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;
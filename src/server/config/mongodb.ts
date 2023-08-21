import mongoose from "mongoose";

const connectMongoDb = async () => {

    let mongoUri: string = process.env.MONGO_URI || ""; 

    try {
        await mongoose.connect(mongoUri);
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDb;
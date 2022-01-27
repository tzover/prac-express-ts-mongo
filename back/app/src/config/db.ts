import mongoose from "mongoose";

const connectDB = async (dbname: string): Promise<void> => {
    const MONGO_URI = process.env.MONGO_URI;
    const connect = await mongoose.connect(MONGO_URI, {
        dbName: dbname,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`---> MongoDB connected!`);
    console.log(`---> userName: ${connect.connection.user}`);
    console.log(`---> CollectionName: ${connect.connection.name}`);
};

export default connectDB;

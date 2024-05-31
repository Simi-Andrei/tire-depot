import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If database is connected, don't connect again

  if (connected) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
const DBconnect = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }
  try {
    await mongoose.connect(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
export default DBconnect;
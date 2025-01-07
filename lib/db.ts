import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("MongoDB is already connected "); 
        return   
    }

    if (connectionState === 2) {
        console.log("MongoDB connection is connecting "); 
        return   
    }

    try{
        mongoose.connect(MONGODB_URI!,{
            dbName: 'cluster0',
            bufferCommands: true,
        } );
    } catch (error: any){
        console.log("MongoDB connection error: ", error);
        throw new Error ("MongoDB connection error", )
    }
}













// Ensure MONGODB_URI is defined
// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable in your .env.local file");
// }

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit the process if the connection fails
//   }
// }

export default connectToDatabase;

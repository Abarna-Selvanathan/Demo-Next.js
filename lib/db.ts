import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGO_URI)

mongoose.connect(MONGO_URI, { NewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

module.exports = mongoose;

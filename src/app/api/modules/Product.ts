import mongoose from 'mongoose';

// Define the schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    countInStock: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Check if the model already exists to prevent re-compilation
export default mongoose.models.Product || mongoose.model('Product', productSchema);

import connectToDatabase from "../../../lib/mongodb";
import Product from "../models/Product";

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
      }
      break;

    case "POST":
      try {
        const { name, description, price, stock, category } = req.body;
        const newProduct = new Product({ name, description, price, stock, category });
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



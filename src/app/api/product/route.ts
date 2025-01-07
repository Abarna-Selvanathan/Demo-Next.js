import connectToDatabase from "../../../../lib/db";
import Product from "../../api/modules/Product";

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure MongoDB is connected

  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
      break;

    case "POST":
      try {
        const { name, price, countInStock } = req.body;
        const newProduct = new Product({ name, price, countInStock });
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

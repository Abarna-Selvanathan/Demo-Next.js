import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/db'; 
import Product from '../../api/modules/Product'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const products = await Product.find();
                res.status(200).json(products);
            } catch (error: any) {
                res.status(500).json({ error: error.message || 'Internal Server Error' });
            }
            break;

        case 'POST':
            try {
                const { name, price, description } = req.body;

                if (!name || !price) {
                    return res.status(400).json({ error: 'Name and price are required.' });
                }

                const newProduct = new Product({ name, price, description });
                const savedProduct = await newProduct.save();

                res.status(201).json(savedProduct);
            } catch (error: any) {
                console.error('Error saving product:', error.message);
                res.status(500).json({ error: 'Failed to save product.', details: error.message });
            }
            break;
            case 'PATCH':
            try {
                const { id, ...updateFields } = req.body;

                if (!id) {
                    return res.status(400).json({ error: 'Product ID is required for updates.' });
                }

                const updatedProduct = await Product.findByIdAndUpdate(
                    id,
                    { $set: updateFields },
                    { new: true, runValidators: true } // Return the updated document and validate fields
                );

                if (!updatedProduct) {
                    return res.status(404).json({ error: 'Product not found.' });
                }

                res.status(200).json(updatedProduct);
            } catch (error: any) {
                console.error('Error updating product:', error.message);
                res.status(500).json({ error: 'Failed to update product.', details: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
            res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
       
};
const updateProduct = async () => {
    const response = await fetch('/api/product', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: '63b7f2e5e4b07b0012345678',
            price: 29.99,
            description: 'New description'
        })
    });

    const data = await response.json();
    console.log(data);
};

updateProduct();


export default handler;

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
                    { new: true, runValidators: true } 
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

            case 'DELETE':
                try {
                    const { id } = req.body;
    
                    if (!id) {
                        return res.status(400).json({ error: 'Product ID is required for deletion.' });
                    }
    
                    const deletedProduct = await Product.findByIdAndDelete(id);
    
                    if (!deletedProduct) {
                        return res.status(404).json({ error: 'Product not found.' });
                    }
    
                    res.status(200).json({ message: 'Product deleted successfully.', product: deletedProduct });
                } catch (error: any) {
                    res.status(500).json({ error: 'Failed to delete product.', details: error.message });
                }
                break;
    
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    };


export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/db'; // Adjust path if needed
import Product from '../../../app/api/modules/Product'; // Adjust path if needed

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase(); // Ensure the database is connected before performing operations

    if (req.method === 'GET') {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    } else {
        // Handle unsupported methods
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};

export const POST = async (req: Request) => {
    try {
        await connectToDatabase();

        const newProduct = await req.json();
        console.log("Device to save:", newProduct);

        const savedDevice = await Product.insertMany(newProduct);

        return NextResponse.json({ savedDevice },{ status: 200 });
    } catch (error: any) {
        console.error("Error saving body:", error.message);
        return NextResponse.json(
            { message: "Failed to save body.", error: error.message },
            { status: 500 }
        );
    }
};

export default handler;

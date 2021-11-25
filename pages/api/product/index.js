import prisma from "../../../prisma/client";

// Fetch all posts (in /pages/api/posts.ts)
export default async function handle(req, res) {
    if (req.method === "POST") {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                barcode: req.body.barcode,
                price: parseFloat(req.body.price),
            },
        });
        res.json(product);
    }
}

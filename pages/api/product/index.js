import prisma from "../../../prisma/client";

// Fetch all posts (in /pages/api/posts.ts)
export default async function handle(req, res) {
    if (req.method === "POST") {
        if (!isNaN(req.body.price)) {
            const product = await prisma.product.create({
                data: {
                    name: req.body.name,
                    barcode: req.body.barcode,
                    price: parseFloat(req.body.price),
                },
            });
            res.json(product);
        } else {
            res.status(400).send({
                message: "given price is not a number",
            });
        }
    }
}

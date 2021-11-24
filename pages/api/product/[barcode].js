import { PrismaClient } from "@prisma/client"


// Fetch all posts (in /pages/api/posts.ts)
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const product = await prisma.product.findUnique({
      where: {
        barcode: req.query.barcode,
      },
    })
    //console.log(product)
  res.json(product)
}

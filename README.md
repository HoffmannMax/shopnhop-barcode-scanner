## Getting Started

First, run the development server:

yarn dev

Open [http://localhost:3000](http://localhost:3000) and enjoy your shopping experience

## GENERAL APPROACH

The rough requirements are: 
- landing page with easy access to a barcode scanner and the items currently in the basket.
- Admin page to add new products - MongoDB database for storage

### Pages:

- index: Barcode scanner and cart, Checkout is not functionalbut should add products into CartItems table a link them with the customer
- admin: Scan a barcode to fill the input field or type by hand -> create new product

## FRONTEND
I started out using the **create-next-app** starter with Typescript but I quickly realized that would be too much overhead for a MVP.
Even though **Prisma (ORM)** delivers Typescript types for the database schema types I reverted back to vanilla JS.

**Styling** was done with Tailwind and minimal css in /styles/global.css.
Tailwind is a great fit for React because most of it is compartmentalised into smaller components with a focus an reuse.

**Data fetching** happens with Prisma.
Two API routes handle the search for a product with a barcode and posting new products to the DB.

## QUAGGA JS

Quick tipp if you ever use Quagga JS and want it to be responsive. 
Very important canvas.drawingbuffer isn't affected by min values in QUAGGA config

```
.barcode-scanner video, canvas {
    width: 100%;
    height: auto;
}

.barcode-scanner video.drawingBuffer, canvas.drawingBuffer {
    display: none;
}
``` 

## BACKEND

For persitant Storage MongoDB is used as database hosted on [MongoDB](https://www.mongodb.com/)
Prisma.io is used as an ORM between and offers easy schemas and handles requests.

If the db schema is changed following commands are needed to deploy
```
yarn prisma generate
yarn prisma db push
```

**relevant tables: Product, CartItem, Customer**

For further understanding the schema can be found under /prisma/schema.prisma

In addition to that the database contains all needed tables for **NextAuth**.

### Customer (not finished):

I presume that a customer doesn't have to register with the service to use it.

Customer gets assigned an ID on site load and has multiple DateTimestamps to track behaviour (cancelled or checked-out)


## FUTURE IDEAS

 - use [Stripe API](https://stripe.com/docs/api) as payment provider
 - send recite per email or store them in app if user can sign up

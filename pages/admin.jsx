import Head from "next/head";
import { useState } from "react";

import { PrismaClient } from "@prisma/client";
import Scanner from "../components/Scanner";
import ProductList from "../components/ProductList";
//4260641140039
const Admin = ({ products }) => {
    //stores current values of form
    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    //POST new Product to Database
    const onBarcodeSubmit = (event) => {
        event.preventDefault();
        //console.log(barcode, name, price);

        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ barcode, name, price }),
            };

            fetch("/api/product/", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setBarcode("");
                    setName("");
                    setPrice("");
                });
        } catch {
            alert("Price is not a number");
        }
    };

    //sets read barcode in text input
    const onBarcodeScanned = (barcode) => {
        console.log(barcode);
        setBarcode(barcode);
    };

    return (
        <div>
            <Head>
                <title>Admin Page</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="">
                    <Scanner newScan={onBarcodeScanned}></Scanner>
                </div>
                <div className="p-8 ">
                    <form
                        onSubmit={onBarcodeSubmit}
                        className="flex flex-col"
                    >
                        <label htmlFor="barcode">Product barcode</label>
                        <input
                            onChange={(e) => setBarcode(e.target.value)}
                            name="barcode"
                            value={barcode}
                            className="shadow appearance-none border rounded mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Barcode"
                            required
                        ></input>

                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            value={name}
                            type="text"
                            className="shadow appearance-none border rounded mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Name"
                            required
                        ></input>

                        <label htmlFor="price">Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            type="text"
                            value={price}
                            className="shadow appearance-none border rounded mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Price"
                            required
                        ></input>

                        <button
                            type="submit"
                            className="p-4 bg-green-400 rounded-md hover:bg-green-500"
                        >
                            Add Product
                        </button>
                    </form>
                    <ProductList inpProducts={products}></ProductList>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();

    return {
        props: { products },
    };
};

export default Admin;

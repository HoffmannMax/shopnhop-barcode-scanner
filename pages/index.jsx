import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Scanner from "../components/Scanner";
import { useState } from "react";
import Cart from "../components/Cart";

const Home = ({ products }) => {
    const [currProducts, setCurrProducts] = useState([]);

    const onBarcodeScanned = (barcode) => {
        console.log("new Barcode ", barcode);

        fetch("/api/product/" + barcode)
            .then((response) => response.json())
            .then((data) => {
                setCurrProducts((oldList) => [...oldList, data]);
            })
            .catch((e) => {
                //TODO display message to user
                if (e.code == "12") {
                    console.log("Prduct not found");
                }
            });
    };

    return (
        <div>
            <Head>
                <title>shopNhop</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="grid grid-cols-1 md:grid-cols-2">
                <div className="">
                    <Scanner newScann={onBarcodeScanned}></Scanner>
                </div>
                <div className="flex flex-col  bg-gray-100 p-4">
                    {currProducts.length > 0 ? 
                        <>
                            <h1 className="text-2xl">Scanned Products</h1>
                            <Cart data={currProducts}></Cart>
                        </>
                     : 
                        <div className="flex flex-col justify-center items-center mt-6">
                            <h1 className="text-2xl">Currently no Items in Basket</h1>
                            <p>please scan a barcode to begin</p>
                        </div>
                    }
                </div>
            </main>
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

export default Home;

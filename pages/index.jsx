import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Scanner from "../components/Scanner";
import { useState } from "react";
import Productlist from "../components/ProductList";

const Home = ({ products }) => {
    const [currProducts, setCurrProducts] = useState([""]);

    const onBarcodeScanned = (barcode) => {
        console.log("new Barcode ", barcode);
        setCurrProducts((oldList) => [...oldList, barcode]);
        fetch("/api/product/" + barcode).then(response=>response.json())
        .then(data=>{ console.log(data); })
    };

    return (
        <div>
            <Head>
                <title>shopNhop</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="grid grid-flow-col">
                <div className="grid-cols-2">
                    <Scanner newScann={onBarcodeScanned}></Scanner>
                </div>
                <div className="grid-cols-1">
                    <Productlist data={currProducts}></Productlist>
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

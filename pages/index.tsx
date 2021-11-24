import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Scanner from "../components/Scanner";
import { useState } from "react";

const Home: NextPage = ({ products }) => {
    const [productList, setProductList] = useState([""]);

    const onBarcodeScanned = (barcode) => {
        console.log("new Barcode ", barcode);
        setProductList(oldList => [...oldList, barcode])
    };

    return (
        <div>
            <Head>
                <title>shopNhop</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="back">
                <Scanner newScann={onBarcodeScanned}></Scanner>
                <h1 className="">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                {productList.map((product,key) => (
                    <p key={key}>{product}</p>
                ))}
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();

    // Creating a new record
    await prisma.product.create({
        data: {
            barcode: "test",
            price: 1,
        },
    });

    return {
        props: { products },
    };
};

export default Home;

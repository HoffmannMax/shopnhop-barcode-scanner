import Head from "next/head";
import Image from "next/image";
import { Prisma, prisma, PrismaClient } from "@prisma/client";
import Scanner from "../components/Scanner";
import { useState } from "react";
import Productlist from "../components/ProductList";

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
                    if (e.code == '12') {
                      console.log(
                        'Prduct not found'
                      )
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
                    <h1 className="text-2xl">Scanned Products</h1>
                    {currProducts.length > 0 ?
                         <Productlist data={currProducts}></Productlist>
                    :
                        <p>Basket Empty</p>
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

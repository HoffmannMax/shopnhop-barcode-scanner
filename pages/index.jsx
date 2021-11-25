import Head from "next/head";
import Scanner from "../components/Scanner";
import { useState } from "react";
import Cart from "../components/Cart";
import { v4 as uuidv4 } from "uuid";
import prisma from "../prisma/client";

const Home = ({ products }) => {
    const [currProducts, setCurrProducts] = useState([]);
    const [lastScannedAt, setLastScannedAt] = useState(Date.now());

    //checks if given barcode is valid
    const onBarcodeScanned = (barcode) => {
        //3 second wait time
        //var waitTime = 3 * 1000; /* ms */

        //console.log(new Date() - lastScannedAt);
        // if (new Date() - lastScannedAt > waitTime) {

        fetch("/api/product/" + barcode)
            .then((response) => response.json())
            .then((data) => {
                data.uuid = uuidv4();
                setCurrProducts((oldList) => [...oldList, data]);
            })
            .catch((e) => {
                //TODO display message to user
                if (e.code == "12") {
                    console.log("Prduct not found");
                }
            });
        // setLastScannedAt(Date.now());
    };

    //removes item from prductlist depending on uuid
    function handleRemove(uuid) {
        //console.log(uuid);
        const newProducts = currProducts.filter((prod) => prod.uuid !== uuid);

        setCurrProducts(newProducts);
    }

    return (
        <div>
            <Head>
                <title>shopNhop</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main
                id="content-container"
                className="grid grid-cols-1 md:grid-cols-2"
            >
                <div className="">
                    <Scanner newScan={onBarcodeScanned}></Scanner>
                </div>
                <div className="flex flex-col  bg-gray-100 p-4 overflow-y-auto h-full">
                    {currProducts.length > 0 ? (
                        <>
                            <h1 className="text-2xl">Scanned Products</h1>
                            <Cart
                                data={currProducts}
                                removeCallback={handleRemove}
                            ></Cart>
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center mt-6">
                            <h1 className="text-2xl">
                                Currently no Items in Basket
                            </h1>
                            <p>please scan a barcode to begin</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const products = await prisma.product.findMany();

    return {
        props: { products },
    };
};

export default Home;

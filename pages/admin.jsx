import Head from "next/head";
import { useState } from "react";

//4260641140039
const Admin = (props) => {
    const onBarcodeSubmit = (event) => {
        event.preventDefault();
        console.log(barcode, name, price);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({barcode,name,price}),
        };
        fetch("/api/product/", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    return (
        <div>
            <Head>
                <title>Admin</title>
                <meta name="description" content="Barcode self-checkout App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="">
                <form
                    onSubmit={onBarcodeSubmit}
                    className="flex flex-col justify-center"
                >
                    <input
                        onChange={e => setBarcode(e.target.value)}
                        name="barcode"
                        type="text"
                        placeholder="Barcode"
                        required
                    ></input>
                    <input
                        onChange={e => setName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                    ></input>
                    <input
                        onChange={e => setPrice(e.target.value)}
                        name="price"
                        type="text"
                        placeholder="Price"
                        required
                    ></input>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;

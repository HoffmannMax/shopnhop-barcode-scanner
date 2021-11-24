import { useEffect, useState } from "react";

export default function ProductList({ data }) {
    const [currTotal, setCurrTotal] = useState(0);

    useEffect(() => {
        let sum = data.reduce(function (prev, current) {
            return prev + current.price;
        }, 0);
        setCurrTotal(sum);
    }, [data]);

    return (
        <>
            <div className="">
                <ul className="text-center">
                    {data &&
                        data.map((product, index) => (
                            <li
                                key={`${index}`}
                                className="flex flex-wrap flex-row items-start justify-between overflow-hidden p-2 border-b-2"
                            >
                                <p className="">
                                    {product.name} 
                                </p>
                                <p className="text-red">
                                {product.price}€
                                </p>
                                
                            </li>
                        ))}
                </ul>
                <p className="">Total: {currTotal}€</p>
                <button className="w-full p-4 mt-2 bg-green-600 text-white">Checkout</button>
            </div>
        </>
    );
}

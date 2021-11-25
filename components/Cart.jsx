import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Cart({ data, removeCallback }) {
    const [currTotal, setCurrTotal] = useState(0);

    useEffect(() => {
        //summ up all items in cart
        let sum = data.reduce(function (prev, current) {
            return prev + current.price;
        }, 0);
        setCurrTotal(sum);
    }, [data]);

   
   

    return (
        <>
            <div className="">
                <ul className="text-center">
                    
                    {//used uuid for key (unique)
                    data &&
                        data.map((product, index) => (
                           //normaly extra component for cart element
                            <li
                                key={uuidv4(product.id)}
                                className="flex flex-wrap flex-row items-center  justify-between overflow-hidden p-2 border-b-2"
                            >
                                <p className="">{product.name}</p>
                                <p className="text-red">{product.price}€</p>
                                <button
                                    type="button"
                                    className="bg-red-400 p-2 rounded-md"
                                    onClick={() => removeCallback(product.uuid)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                </ul>
                <p className="">Total: {currTotal}€</p>
                <button className="w-full p-4 mt-2 bg-green-600 text-white">
                    Checkout
                </button>
            </div>
        </>
    );
}

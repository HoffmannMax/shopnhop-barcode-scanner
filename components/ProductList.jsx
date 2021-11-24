import { useEffect, useState } from 'react'


export default function ProductList({ data }) {
   

    return (<>

        <h1>Scanned Products</h1>
        <ul className="text-center">
           
            {data && data.map((product, index) => (
                <li key={`${index}`} className="flex flex-wrap overflow-hidden">
                    {product}
                </li>

            ))}
        </ul>
    </>)
}


export default function ProductList({ inpProducts }) {
    return (
        <div className="mt-4">
            <table className="w-full p-4">
                <th className="text-left pl-2">Barcode</th>
                <th className="text-left pl-2">Name</th>
                <th className="text-left pl-2">Price</th>
                {
                    //used uuid for key (unique)
                    inpProducts &&
                        inpProducts.map((product) => (
                            //normaly extra component for cart element
                            <tr className="border-b-2">
                                <td className="p-2">{product.barcode}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}€</td>
                            </tr>
                        ))
                }
            </table>
        </div>
    );
}

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <>
            <nav className="flex items-center content-center justify-between flex-wrap bg-green-400 p-3 h-20 ">
                <Link href="/">
                    <a>
                        <Image
                            className="cursor-pointer"
                            src="/shopNhop_logo.png"
                            alt="hopNshop logo"
                            width={200}
                            height={60}
                        ></Image>
                    </a>
                </Link>
                <Link href="/admin">
                    <a className=" px-3 py-2 rounded text-black font-bold hover:bg-green-600 hover:text-white">
                        Admin
                    </a>
                </Link>
            </nav>
        </>
    );
}

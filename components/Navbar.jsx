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
            <nav className="flex items-center content-center flex-wrap bg-green-400 p-3 h-20 ">
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
                <button
                    className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
                    onClick={handleClick}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
                <div
                    className={`${
                        active ? "" : "hidden"
                    }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                    <div className="lg:inline-flex mr-2 lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                        <Link href="/admin">
                            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center hover:bg-green-600 hover:text-white">
                                Admin
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

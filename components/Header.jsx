import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Login from "./Login";

function Header() {
    return (
        <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow-xl">
            <Link href="/">
                <Image
                    src={logo}
                    width={70}
                    height={70}
                    alt="Logo"
                />
            </Link>
            <Login />
        </header>
    );
}

export default Header;

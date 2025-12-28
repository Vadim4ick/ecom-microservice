import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex-between border-b border-gray-200 pb-4">
      <Link href="/" className="flex-start">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={36}
          height={36}
          className="size-6 md:size-9"
        />

        <p className="text-md hidden md:block font-medium tracking-wider">
          TRENDLAMA.
        </p>
      </Link>

      <div className="flex-start gap-6">
        <SearchBar />

        <Link href="/">
          <Home className="size-4 text-gray-600" />
        </Link>

        <Bell className="size-4 text-gray-600" />
        <ShoppingCart className="size-4 text-gray-600" />

        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export { Navbar };

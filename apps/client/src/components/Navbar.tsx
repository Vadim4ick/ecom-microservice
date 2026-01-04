import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { ProfileButton } from "./ProfileButton";

const Navbar = () => {
  return (
    <nav className="flex-between w-full border-b border-gray-200 pb-4">
      <Link href="/" className="flex-start">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={36}
          height={36}
          className="size-6 md:size-9"
        />

        <p className="text-md hidden font-medium tracking-wider md:block">
          TRENDLAMA.
        </p>
      </Link>

      <div className="flex-start gap-6">
        <SearchBar />

        <Link href="/">
          <Home className="size-4 text-gray-600" />
        </Link>

        <Bell className="size-4 text-gray-600" />
        <ShoppingCartIcon />

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export { Navbar };

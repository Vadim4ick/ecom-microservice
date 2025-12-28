import { footerLinks } from "@/shared/const/footer.const";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="TrendLama" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            TRENDLAMA.
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 Trendlama.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>

      {footerLinks.map((link) => (
        <div
          key={link.id}
          className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start"
        >
          <p className="text-sm text-amber-50">{link.name}</p>

          {link.items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-amber-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export { Footer };

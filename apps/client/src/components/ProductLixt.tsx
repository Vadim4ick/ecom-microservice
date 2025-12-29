import { products } from "@/shared/const/products.const";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Categories } from "./Categories";
import Filter from "./Filter";

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  return (
    <div className="w-full">
      <Categories />

      {params === "products" && <Filter />}

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="mt-4 flex justify-end text-sm text-gray-500 underline"
      >
        View all products
      </Link>
    </div>
  );
};

export { ProductList };

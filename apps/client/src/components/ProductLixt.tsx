import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Categories } from "./Categories";
import Filter from "./Filter";
import { Product } from "@repo/db";

const fetchData = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/product?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`,
  );

  const data: Product[] = await res.json();
  console.log(data);
  return data;
};

const ProductList = async ({
  category,
  params,
  sort,
  search,
}: {
  category: string;
  params: "homepage" | "products";
  sort?: string;
  search?: string;
}) => {
  const products = await fetchData({ category, sort, search, params });

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

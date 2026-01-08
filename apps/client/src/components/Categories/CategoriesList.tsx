import { Category } from "@repo/db";
import { CategoryItem } from "./CategoryItem";

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/category`,
  );

  const data: Category[] = await res.json();

  return data;
};

const CategoriesList = async ({ category }: { category: string }) => {
  const categories = await fetchData();

  return (
    <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {categories &&
        [{ id: "all", name: "Все", slug: "all" }, ...categories]?.map((el) => (
          <CategoryItem
            name={el.name}
            slug={el.slug}
            key={el.id}
            selectedCategory={category ?? "all"}
          />
        ))}
    </div>
  );
};

export { CategoriesList };

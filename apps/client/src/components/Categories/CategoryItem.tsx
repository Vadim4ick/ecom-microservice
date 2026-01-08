"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryItem = ({
  slug,
  name,
  selectedCategory,
}: {
  slug: string;
  name: string;
  selectedCategory?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 ${
        slug === selectedCategory ? "bg-white" : "text-gray-500"
      }`}
      key={name}
      onClick={() => handleChange(slug)}
    >
      {/* {category.icon} */}
      {name}
    </div>
  );
};

export { CategoryItem };

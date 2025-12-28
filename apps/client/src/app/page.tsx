import { ProductList } from "@/components/ProductLixt";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;

  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image src={"/featured.png"} fill alt="featured" />
      </div>

      <ProductList params="homepage" category={category} />
    </div>
  );
};

export default Homepage;

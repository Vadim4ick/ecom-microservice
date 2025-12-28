import Image from "next/image";

const Homepage = () => {
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image src={"/featured.png"} fill alt="featured" />
      </div>
    </div>
  );
};

export default Homepage;

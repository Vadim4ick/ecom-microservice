import { prisma } from "../src";

async function resetDatabase() {
  console.log("Resetting database...");

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Product",
      "Category"
    RESTART IDENTITY
    CASCADE;
  `);
}

async function seedCategories() {
  return prisma.category.createMany({
    data: [
      { name: "T-Shirts", slug: "t-shirts" },
      { name: "Hoodies", slug: "hoodies" },
    ],
  });
}

async function seedProducts() {
  return prisma.product.createMany({
    data: [
      {
        name: "Adidas CoreFit T-Shirt",
        shortDescription:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 3990,
        sizes: ["s", "m", "l", "xl", "xxl"],
        colors: ["gray", "purple", "green"],
        images: {
          gray: "/products/1g.png",
          purple: "/products/1p.png",
          green: "/products/1gr.png",
        },
        categorySlug: "t-shirts",
      },
      {
        name: "Puma Ultra Warm Zip",
        shortDescription:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 5990,
        sizes: ["s", "m", "l", "xl"],
        colors: ["gray", "green"],
        images: {
          gray: "/products/2g.png",
          green: "/products/2gr.png",
        },
        categorySlug: "hoodies",
      },
      {
        name: "Nike Air Essentials Pullover",
        shortDescription:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
          "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 6990,
        sizes: ["s", "m", "l"],
        colors: ["green", "blue", "black"],
        images: {
          green: "/products/3gr.png",
          blue: "/products/3b.png",
          black: "/products/3bl.png",
        },
        categorySlug: "hoodies",
      },
    ],
  });
}

async function main() {
  await resetDatabase();
  await seedCategories();
  await seedProducts();

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";

export const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="h-4 w-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="h-4 w-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="h-4 w-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="h-4 w-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="h-4 w-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="h-4 w-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="h-4 w-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="h-4 w-4" />,
    slug: "gloves",
  },
];

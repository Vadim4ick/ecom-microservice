"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="See orders"
          onClick={() => {
            router.push("/orders");
          }}
          labelIcon={<ShoppingBag className="size-4" />}
        >
          Profile
        </UserButton.Action>
      </UserButton.MenuItems>
    </UserButton>
  );
};

export { ProfileButton };

"use client";

import { PaymentForm } from "@/components/PaymentForm";
import { ShippingForm } from "@/components/ShippingForm";
import {
  CartItemsType,
  CartItemType,
  ShippingFormInputs,
} from "@/shared/types/cart.type";
import { useCartStore } from "@/stores/cart.store";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const router = useRouter();

  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-8">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* STEPS */}
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full p-4 text-white ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* STEPS & DETAILS */}
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        {/* STEPS */}
        <div className="flex w-full flex-col gap-8 rounded-lg border border-gray-100 p-8 shadow-lg lg:w-7/12">
          {activeStep === 1 ? (
            cart.map((item) => (
              // SINGLE CART ITEM
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={item.images[item.selectedColor]! ?? ""}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-400 transition-all duration-300 hover:bg-red-200"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : //
          activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex h-max w-full flex-col gap-8 rounded-lg border border-gray-100 p-8 shadow-lg lg:w-5/12">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$ 10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all duration-300 hover:bg-gray-900"
            >
              Continue
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

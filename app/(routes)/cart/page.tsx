"use client";
import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import useCart from "@/hooks/useCart";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  console.log(cart.items);
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">Your cart is empty</p>}
              <ul>
                {cart.items.map(item => (
                  <CartItem key={item.product?.id} data={item.product} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
      <button onClick={cart.removeAll}>Remove all</button>
    </div>
  );
}

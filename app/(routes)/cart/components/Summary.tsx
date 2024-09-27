"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";
import axios from "axios";

export default function Summary() {
  const searchParams = useSearchParams();
  const items = useCart(s => s.items);
  const removeAll = useCart(s => s.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Order placed successfully");
      removeAll();
    }
    if (searchParams.get("cancelled")) {
      toast.error("An error occurred while placing your order");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.product.price) * item.quantity,
    0
  );

  const onCheckout = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map(item => item.product.id),
      // TODO: Send Quantities to backend
    });
    window.location = res.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Subtotal</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className="mt-6 w-full">
        Checkout
      </Button>
      {/* Taxes and fees diclaimer */}
      <div className="mt-4 text-sm text-gray-500">
        <p>* Taxes and fees calculated at checkout.</p>
      </div>
    </div>
  );
}

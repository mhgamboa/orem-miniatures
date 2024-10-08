"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";

import { Minus, Plus } from "lucide-react";

import IconButton from "@/components/ui/IconButton";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";

type Props = {
  data: Product;
};
export default function CartItem({ data }: Props) {
  const cart = useCart();

  // const onRemove = () => cart.removeItem(data.id);
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    cart.addItem(data);
  };

  const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    cart.removeItem(data.id);
  };
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data?.images[0].url}
          alt="Product"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        {/* <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={20} />} />
        </div> */}
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data?.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data?.designer.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data?.size.name}</p>
          </div>
          <Currency value={data?.price} />
        </div>
        <div className="flex items-center justify-between">
          {/* Show minus button if cart item quanity is greater than 0 */}
          {cart.items.find(item => item.product?.id === data.id)?.quantity !== 0 && (
            <IconButton
              onClick={onRemoveFromCart}
              icon={<Minus size={20} className="text-gray-600" />}
            />
          )}
          {/* show quantity if cart item quantity is greater than 0 */}
          {cart.items.find(item => item.product?.id === data.id)?.quantity !== 0 && (
            <p className="text-sm text-gray-500">
              {cart.items.find(item => item.product?.id === data.id)?.quantity}
            </p>
          )}
          {/* Show plus button if cart item quantity is 0 */}
          {cart.items.find(item => item.product?.id === data.id)?.quantity !== 0 && (
            <IconButton onClick={onAddToCart} icon={<Plus size={20} className="text-gray-600" />} />
          )}
        </div>
      </div>
    </li>
  );
}

"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";

import { Product } from "@/types";
import IconButton from "@/components/ui/IconButton";
import { Expand, Minus, Plus, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/Currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

type Props = {
  data: Product;
};

export default function ProductCard({ data }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const previewModal = usePreviewModal();
  const cart = useCart();

  const onPreview: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    cart.addItem(data);
  };

  const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    cart.removeItem(data.id);
  };

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="Product"
          src={data.images[0].url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600" />} />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
      <div className="flex items-center justify-between">
        {(() => {
          const cartItem = cart.items.find(item => item.product?.id === data.id);
          const quantity = cartItem?.quantity ?? 0;

          if (quantity > 0)
            return (
              <>
                <IconButton
                  onClick={onRemoveFromCart}
                  icon={<Minus size={10} className="text-gray-600" />}
                />
                <p className="text-sm text-gray-500">{quantity}</p>
                <IconButton
                  onClick={onAddToCart}
                  icon={<Plus size={10} className="text-gray-600" />}
                />
              </>
            );
        })()}
      </div>
    </div>
  );
}

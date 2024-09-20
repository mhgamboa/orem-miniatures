"use client";
import { Product } from "@/types";
import React from "react";
import Currency from "./ui/Currency";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";

type Props = {
  data: Product;
};

export default function Info({ data }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Designed by:</h3>
          {/* <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{
              backgroundColor: data.color.value,
            }}
          /> */}
          <div className="flex items-center gap-x-2">
            {data.designer.name}
            {data.designer.patreon && <PatreonSvg url={data.designer.patreon} />}
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

const PatreonSvg = ({ url }: { url: string }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4">
        <path d="M489.7 153.8c-.1-65.4-51-119-110.7-138.3C304.8-8.5 207-5 136.1 28.4C50.3 68.9 23.3 157.7 22.3 246.2C21.5 319 28.7 510.6 136.9 512c80.3 1 92.3-102.5 129.5-152.3c26.4-35.5 60.5-45.5 102.4-55.9c72-17.8 121.1-74.7 121-150z" />
      </svg>
    </a>
  );
};

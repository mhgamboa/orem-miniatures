"use client";
import { ShoppingBag } from "lucide-react";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export default function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center bg-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-md text-white">
          {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </Button>
    </div>
  );
}

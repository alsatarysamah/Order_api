"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@store/cart";

export default function Header() {
  const cart = useCartStore((state) => state.cart);

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="relative">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
            💄 Cozmatee
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cart?.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

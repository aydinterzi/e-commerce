"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/state/cartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  quantity = 1,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const itemId = product.variant
      ? `${product.id}-${product.variant}`
      : product.id;
    addItem({
      id: itemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      variant: product.variant,
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-green-500 hover:bg-green-600 text-white"
    >
      Sepete Ekle
    </Button>
  );
}

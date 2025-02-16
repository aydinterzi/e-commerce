import React from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (price: number) =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{formattedPrice(product.price)}</p>
        <Link href={`/products/${product.id}`}>
          <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
}

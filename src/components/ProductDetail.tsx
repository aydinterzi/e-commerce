import React from "react";
import { formattedPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover"
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">
            {formattedPrice(product.price)}
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

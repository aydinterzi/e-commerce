import React from "react";
import ProductCard from "./ProductCard";

const dummyProducts = [
  {
    id: "1",
    name: "Smartphone XYZ",
    price: 500000,
    image: "https://example.com/smartphone.jpg",
  },
  {
    id: "2",
    name: "T-Shirt",
    price: 50000,
    image: "https://example.com/tshirt.jpg",
  },
  {
    id: "3",
    name: "Laptop ABC",
    price: 1500000,
    image: "https://example.com/laptop.jpg",
  },
  {
    id: "4",
    name: "Headphones DEF",
    price: 75000,
    image: "https://example.com/headphones.jpg",
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {dummyProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

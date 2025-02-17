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
    price: 5,
    image: "https://example.com/tshirt.jpg",
  },
  {
    id: "3",
    name: "Laptop ABC",
    price: 1500000,
    image: "https://example.com/laptop.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

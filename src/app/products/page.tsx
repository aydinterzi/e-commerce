import React from "react";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </div>
  );
}

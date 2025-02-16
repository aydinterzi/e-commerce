import React from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/api";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.productId);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}

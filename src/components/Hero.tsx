import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My E-Commerce</h1>
        <p className="text-xl mb-8">
          Discover amazing products and great deals.
        </p>
        <Link href="/products">
          <span className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer">
            Shop Now
          </span>
        </Link>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">
            My E-Commerce
          </span>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/products">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Products
            </span>
          </Link>
          <Link href="/cart">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Cart
            </span>
          </Link>
          <Link href="/profile">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Profile
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

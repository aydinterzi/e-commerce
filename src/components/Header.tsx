"use client";

import React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";

import {
  Search,
  ShoppingCart,
  User,
  Laptop2,
  Home,
  Book,
  Volleyball,
  MoreHorizontal,
  ShoppingBag,
  Dog,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";

export default function Header() {
  const { isSignedIn } = useAuth();

  const categories = [
    { name: "Elektronik", icon: <Laptop2 size={18} /> },
    { name: "Moda", icon: <ShoppingBag size={18} /> },
    { name: "Ev Yaşam", icon: <Home size={18} /> },
    { name: "Kitap & Hobi", icon: <Book size={18} /> },
    { name: "Bebek & Oyuncak", icon: <User size={18} /> },
    { name: "Spor", icon: <Volleyball size={18} /> },
    { name: "Süpermarket", icon: <ShoppingCart size={18} /> },
    { name: "Pet Shop", icon: <Dog size={18} /> },
    { name: "Daha Fazlası", icon: <MoreHorizontal size={18} /> },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer text-orange-600">
              My E-Commerce
            </span>
          </Link>
          <span className="hidden md:inline-block text-sm text-gray-500">
            Konum: Erim
          </span>
        </div>

        <div className="flex-1 mx-4 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Ürün, kategori veya marka ara"
              className="rounded-full pr-10 bg-gray-100 focus:bg-white transition-colors"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/profile"
            className="flex items-center space-x-2 hover:text-gray-800 transition-colors"
          >
            <User className="text-gray-600" size={24} />
            <span className="hidden md:inline-block text-gray-600">
              Hesabım
            </span>
          </Link>

          <Link
            href="/favorites"
            className="hidden md:flex items-center space-x-2 hover:text-gray-800 transition-colors"
          >
            <span className="text-gray-600">Favorilerim</span>
          </Link>

          <Link
            href="/cart"
            className="flex items-center space-x-2 hover:text-gray-800 transition-colors"
          >
            <ShoppingCart className="text-gray-600" size={24} />
            <span className="hidden md:inline-block text-gray-600">
              Sepetim
            </span>
          </Link>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="flex space-x-3">
              <Link
                href="/sign-in"
                className="text-sm text-blue-600 hover:underline"
              >
                Giriş Yap
              </Link>
              <Link
                href="/sign-up"
                className="text-sm text-blue-600 hover:underline"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 flex items-center gap-4 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import { useCartStore } from "@/state/cartStore";
import { Button } from "@/components/ui/button"; // ShadCN UI Button bileşeni

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, clearCart } = useCartStore();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sepetim</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                {item.variant && (
                  <p className="text-gray-500">Variant: {item.variant}</p>
                )}
                <p className="text-gray-700">
                  Fiyat:{" "}
                  {(item.price / 100).toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
                <div className="flex items-center mt-2">
                  <label
                    htmlFor={`quantity-${item.id}`}
                    className="mr-2 text-sm text-gray-600"
                  >
                    Adet:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Button
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                >
                  Sil
                </Button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="text-xl font-bold">
              Toplam:{" "}
              {(totalPrice / 100).toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </p>
            <div className="mt-4 flex space-x-4">
              <Button variant="destructive" onClick={clearCart}>
                Sepeti Temizle
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Ödeme Yap
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

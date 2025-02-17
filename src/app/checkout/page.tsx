"use client";

import React, { useState } from "react";
import { useCartStore } from "@/state/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    alert("Ödeme işlemi başlatıldı.");
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ödeme ve Teslimat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Teslimat Bilgileri</h2>
          <div>
            <Label htmlFor="fullName">Ad Soyad</Label>
            <Input
              id="fullName"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Adınızı ve soyadınızı giriniz"
            />
          </div>
          <div>
            <Label htmlFor="address">Adres</Label>
            <Input
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Adresinizi giriniz"
            />
          </div>
          <div>
            <Label htmlFor="city">Şehir</Label>
            <Input
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Şehir"
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Posta Kodu</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Posta kodu"
            />
          </div>
          <div>
            <Label htmlFor="country">Ülke</Label>
            <Input
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Ülke"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Sipariş Özeti</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {item.variant && (
                      <p className="text-sm text-gray-500">
                        Variant: {item.variant}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Adet: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  {((item.price * item.quantity) / 100).toLocaleString(
                    "tr-TR",
                    {
                      style: "currency",
                      currency: "TRY",
                    }
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <p className="text-xl font-bold">
              Toplam:{" "}
              {(totalPrice / 100).toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </p>
          </div>
          <Button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ödeme Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

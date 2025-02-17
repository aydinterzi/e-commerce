"use client";

import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  const [profileData, setProfileData] = useState({
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "ahmet@example.com",
    address: "123 Sokak, İstanbul",
  });

  const orders = [
    { id: "1", date: "2023-02-15", total: 150000 },
    { id: "2", date: "2023-01-10", total: 50000 },
  ];

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Lütfen giriş yapınız.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profilim</h1>
      <div className="mb-6">
        <div className="flex space-x-4 border-b mb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Profil Bilgileri
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 ${
              activeTab === "orders"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Sipariş Geçmişi
          </button>
        </div>

        {activeTab === "profile" ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">Ad</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Soyad</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full"
              />
            </div>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Bilgileri Güncelle
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="border p-4 rounded-md">
                  <p>
                    <span className="font-semibold">Sipariş ID:</span>{" "}
                    {order.id}
                  </p>
                  <p>
                    <span className="font-semibold">Tarih:</span> {order.date}
                  </p>
                  <p>
                    <span className="font-semibold">Toplam:</span>{" "}
                    {(order.total / 100).toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>Henüz siparişiniz bulunmamaktadır.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

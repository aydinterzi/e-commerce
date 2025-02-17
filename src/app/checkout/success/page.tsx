import React from "react";

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
      <p className="text-green-600">
        Ödemeniz başarıyla alındı. Siparişiniz en kısa sürede işleme
        alınacaktır.
      </p>
    </div>
  );
}

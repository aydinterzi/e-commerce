import React from "react";

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ödeme İptal Edildi</h1>
      <p className="text-red-600">
        Ödeme işlemi iptal edildi. Dilerseniz sepetinize tekrar göz
        atabilirsiniz.
      </p>
    </div>
  );
}

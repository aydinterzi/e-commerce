import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        © {new Date().getFullYear()} My E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}

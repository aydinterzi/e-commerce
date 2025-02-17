import { Product } from "@/components/ProductDetail";

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description: "Latest smartphone with amazing features.",
    price: 500000,
    image: "https://example.com/smartphone.jpg",
  },
  {
    id: "2",
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt.",
    price: 5,
    image: "https://example.com/tshirt.jpg",
  },
  {
    id: "3",
    name: "Laptop ABC",
    description: "High performance laptop for professionals.",
    price: 1500000,
    image: "https://example.com/laptop.jpg",
  },
];

export async function getProductById(productId: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyProducts.find((product) => product.id === productId) || null;
}

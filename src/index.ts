import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import {
  categories,
  products,
  productVariants,
  carts,
  cartItems,
  orders,
  orderItems,
  payments,
  reviews,
} from "./lib/db/schema"; // Dosya yolunu projenize göre ayarlayın

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // --- KATEGORİLER ---
  const newCategory1: typeof categories.$inferInsert = {
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets.",
  };

  const newCategory2: typeof categories.$inferInsert = {
    name: "Clothing",
    slug: "clothing",
    description: "Apparel, garments and accessories.",
  };

  const newCategory3: typeof categories.$inferInsert = {
    name: "Books",
    slug: "books",
    description: "Books and literature.",
  };

  const [electronics] = await db
    .insert(categories)
    .values(newCategory1)
    .returning();
  const [clothing] = await db
    .insert(categories)
    .values(newCategory2)
    .returning();
  const [books] = await db.insert(categories).values(newCategory3).returning();
  console.log("Categories inserted:", electronics, clothing, books);

  // --- ÜRÜNLER ---
  const newProduct1: typeof products.$inferInsert = {
    name: "Smartphone XYZ",
    description: "Latest smartphone with amazing features.",
    price: 500000, // kuruş cinsinden
    stock: 100,
    categoryId: electronics.id,
    images: JSON.stringify(["https://example.com/smartphone.jpg"]),
  };

  const newProduct2: typeof products.$inferInsert = {
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt.",
    price: 50000,
    stock: 200,
    categoryId: clothing.id,
    images: JSON.stringify(["https://example.com/tshirt.jpg"]),
  };

  const [product1] = await db.insert(products).values(newProduct1).returning();
  const [product2] = await db.insert(products).values(newProduct2).returning();
  console.log("Products inserted:", product1, product2);

  // --- ÜRÜN VARYANTLARI ---
  const newVariant1: typeof productVariants.$inferInsert = {
    productId: product1.id,
    variantName: "Color",
    variantValue: "Black",
    additionalPrice: 0,
    stock: 50,
  };

  const newVariant2: typeof productVariants.$inferInsert = {
    productId: product1.id,
    variantName: "Color",
    variantValue: "White",
    additionalPrice: 0,
    stock: 50,
  };

  const newVariant3: typeof productVariants.$inferInsert = {
    productId: product2.id,
    variantName: "Size",
    variantValue: "M",
    additionalPrice: 0,
    stock: 100,
  };

  const newVariant4: typeof productVariants.$inferInsert = {
    productId: product2.id,
    variantName: "Size",
    variantValue: "L",
    additionalPrice: 0,
    stock: 100,
  };

  const [variant1] = await db
    .insert(productVariants)
    .values(newVariant1)
    .returning();
  const [variant2] = await db
    .insert(productVariants)
    .values(newVariant2)
    .returning();
  const [variant3] = await db
    .insert(productVariants)
    .values(newVariant3)
    .returning();
  const [variant4] = await db
    .insert(productVariants)
    .values(newVariant4)
    .returning();
  console.log(
    "Product variants inserted:",
    variant1,
    variant2,
    variant3,
    variant4
  );

  // --- SEPET VE SEPET KALEMLERİ ---
  const userId = "123e4567-e89b-12d3-a456-426614174000"; // Örnek kullanıcı ID (Clerk tarafından sağlanan UUID)
  const newCart: typeof carts.$inferInsert = {
    userId: userId,
  };
  const [cart] = await db.insert(carts).values(newCart).returning();
  console.log("Cart inserted:", cart);

  const newCartItem: typeof cartItems.$inferInsert = {
    cartId: cart.id,
    productId: product1.id,
    variantId: variant1.id,
    quantity: 1,
    unitPrice: product1.price,
    totalPrice: product1.price,
  };
  const [cartItem] = await db.insert(cartItems).values(newCartItem).returning();
  console.log("Cart item inserted:", cartItem);

  // --- SİPARİŞLER VE SİPARİŞ KALEMLERİ ---
  const newOrder: typeof orders.$inferInsert = {
    userId: userId,
    total: product1.price,
    shippingAddress: JSON.stringify({
      street: "123 Main St",
      city: "Istanbul",
      country: "Turkey",
    }),
    billingAddress: JSON.stringify({
      street: "123 Main St",
      city: "Istanbul",
      country: "Turkey",
    }),
    status: "confirmed",
  };

  const [order] = await db.insert(orders).values(newOrder).returning();
  console.log("Order inserted:", order);

  const newOrderItem: typeof orderItems.$inferInsert = {
    orderId: order.id,
    productId: product1.id,
    variantId: variant1.id,
    quantity: 1,
    unitPrice: product1.price,
    totalPrice: product1.price,
  };
  const [orderItem] = await db
    .insert(orderItems)
    .values(newOrderItem)
    .returning();
  console.log("Order item inserted:", orderItem);

  // --- ÖDEMELER ---
  const newPayment: typeof payments.$inferInsert = {
    orderId: order.id,
    paymentMethod: "stripe",
    transactionId: "txn_1234567890",
    amount: product1.price,
    paymentStatus: "completed",
  };
  const [payment] = await db.insert(payments).values(newPayment).returning();
  console.log("Payment inserted:", payment);

  // --- YORUMLAR ---
  const newReview: typeof reviews.$inferInsert = {
    productId: product1.id,
    userId: userId,
    rating: 5,
    comment: "Harika bir ürün, çok memnun kaldım!",
  };
  const [review] = await db.insert(reviews).values(newReview).returning();
  console.log("Review inserted:", review);

  console.log("Seed process completed successfully!");
}

main().catch((err) => {
  console.error("Seed process failed:", err);
  process.exit(1);
});

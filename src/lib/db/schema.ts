// lib/db/schema.ts

import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  json,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Kategoriler
 * Ürünlerin ait olduğu kategorileri tutar.
 */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/**
 * Ürünler
 * Satışa sunulan ürünlerin temel bilgilerini içerir.
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // Fiyat: kuruş cinsinden
  stock: integer("stock").notNull().default(0),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  images: json("images").notNull(), // Ürün resimlerinin URL'lerini içeren JSON dizisi
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/**
 * Ürün Varyantları
 * Ürünlerin farklı seçeneklerini (ör. beden, renk) içerir.
 */
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  variantName: varchar("variant_name", { length: 255 }).notNull(), // Örn: "Beden", "Renk"
  variantValue: varchar("variant_value", { length: 255 }).notNull(), // Örn: "M", "Kırmızı"
  additionalPrice: integer("additional_price").default(0), // Fiyat farkı (kuruş)
  stock: integer("stock").notNull().default(0),
});

/**
 * Siparişler
 * Kullanıcıların oluşturduğu sipariş bilgilerini saklar.
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // Clerk'den alınan kullanıcı kimliği (UUID)
  total: integer("total").notNull(), // Sipariş toplamı (kuruş cinsinden)
  status: varchar("status", { length: 50 }).notNull().default("pending"), // Örn: pending, confirmed, shipped, delivered, cancelled
  shippingAddress: json("shipping_address").notNull(), // Teslimat adresi bilgileri JSON olarak
  billingAddress: json("billing_address").notNull(), // Fatura adresi bilgileri JSON olarak
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/**
 * Sipariş Kalemleri
 * Her siparişe ait alınan ürünlerin detaylarını içerir.
 */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  variantId: integer("variant_id").references(() => productVariants.id),

  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull(), // Ürün birim fiyatı (sipariş anındaki fiyat, kuruş)
  totalPrice: integer("total_price").notNull(), // quantity * unitPrice
});

/**
 * Sepetler
 * Kullanıcıların aktif alışveriş sepetlerini saklar.
 */
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // Kullanıcı kimliği (giriş yapılmış kullanıcı veya guest id)
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/**
 * Sepet Kalemleri
 * Sepet içindeki ürünlerin detaylarını tutar.
 */
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .references(() => carts.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  variantId: integer("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull(), // Ürün fiyatı (kuruş cinsinden)
  totalPrice: integer("total_price").notNull(), // quantity * unitPrice
});

/**
 * Ödemeler
 * Siparişlere ait ödeme işlemlerinin detayları.
 */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  paymentMethod: varchar("payment_method", { length: 100 }).notNull(), // Ödeme yöntemi (örn: kredi kartı, PayPal)
  transactionId: varchar("transaction_id", { length: 255 }).notNull(), // Stripe veya diğer ödeme sağlayıcı işlem ID'si
  amount: integer("amount").notNull(), // Ödeme miktarı (kuruş)
  paymentStatus: varchar("payment_status", { length: 50 })
    .notNull()
    .default("pending"), // Ödeme durumu
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/**
 * Ürün Yorumları / İncelemeleri
 * Kullanıcıların ürünlere yaptığı değerlendirmeler.
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  userId: uuid("user_id").notNull(), // Clerk kullanıcı kimliği
  rating: integer("rating").notNull(), // 1-5 arası puanlama
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

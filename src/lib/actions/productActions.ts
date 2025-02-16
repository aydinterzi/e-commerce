// lib/actions/productActions.ts

"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  images: any; // JSON formatında resim URL'leri
}

/**
 * Yeni bir ürün oluşturur.
 */
export async function createProduct(productData: ProductInput) {
  try {
    const newProduct = await db
      .insert(products)
      .values({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        images: productData.images,
      })
      .returning();
    return newProduct;
  } catch (error) {
    console.error("Ürün oluşturulurken hata:", error);
    throw error;
  }
}

/**
 * Belirli bir ürünün stok bilgisini günceller.
 */
export async function updateProductStock(productId: number, newStock: number) {
  try {
    const updatedProduct = await db
      .update(products)
      .set({ stock: newStock })
      .where(eq(products.id, productId))
      .returning();
    return updatedProduct;
  } catch (error) {
    console.error("Ürün stoğu güncellenirken hata:", error);
    throw error;
  }
}

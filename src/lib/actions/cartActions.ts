// lib/actions/cartActions.ts

"use server";

import { db } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface CartItemInput {
  cartId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Sepete yeni bir ürün ekler.
 */
export async function addCartItem(item: CartItemInput) {
  try {
    const newItem = await db
      .insert(cartItems)
      .values({
        cartId: item.cartId,
        productId: item.productId,
        variantId: item.variantId ?? null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })
      .returning();
    return newItem;
  } catch (error) {
    console.error("Sepete ürün eklenirken hata:", error);
    throw error;
  }
}

/**
 * Sepet kaleminin miktarını günceller.
 */
export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
) {
  try {
    // Not: totalPrice hesaplamasını backend'de veya client'ta yapabilirsiniz.
    const updatedItem = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, cartItemId))
      .returning();
    return updatedItem;
  } catch (error) {
    console.error("Sepet kalemi güncellenirken hata:", error);
    throw error;
  }
}

/**
 * Sepet kalemini siler.
 */
export async function removeCartItem(cartItemId: number) {
  try {
    const deletedItem = await db
      .delete(cartItems)
      .where(eq(cartItems.id, cartItemId))
      .returning();
    return deletedItem;
  } catch (error) {
    console.error("Sepet kalemi silinirken hata:", error);
    throw error;
  }
}

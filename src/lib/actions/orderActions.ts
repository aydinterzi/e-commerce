// lib/actions/orderActions.ts

"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Sipariş içindeki ürün kalemlerinin tipi
interface OrderItemInput {
  productId: number;
  variantId?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Sipariş oluşturma girişi
export interface OrderInput {
  userId: string; // Clerk'den gelen UUID
  total: number; // Sipariş toplamı (kuruş cinsinden)
  shippingAddress: Record<string, any>; // JSON formatında teslimat adresi
  billingAddress: Record<string, any>; // JSON formatında fatura adresi
  items: OrderItemInput[];
}

/**
 * Yeni bir sipariş oluşturur.
 * 1. orders tablosuna sipariş kaydı ekler.
 * 2. orderItems tablosuna sipariş kalemlerini ekler.
 */
export async function createOrder(orderData: OrderInput) {
  try {
    // Sipariş kaydını oluştur
    const newOrder = await db
      .insert(orders)
      .values({
        userId: orderData.userId,
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress,
        status: "pending",
      })
      .returning();

    const orderId = newOrder[0].id;

    // Her sipariş kalemi için orderItems kaydı ekle
    for (const item of orderData.items) {
      await db.insert(orderItems).values({
        orderId,
        productId: item.productId,
        variantId: item.variantId ?? null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      });
    }

    return { orderId, ...newOrder[0] };
  } catch (error) {
    console.error("Sipariş oluşturulurken hata:", error);
    throw error;
  }
}

/**
 * Belirtilen siparişin durumunu günceller.
 */
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const updatedOrder = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, orderId))
      .returning();
    return updatedOrder;
  } catch (error) {
    console.error("Sipariş durumu güncellenirken hata:", error);
    throw error;
  }
}

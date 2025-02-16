"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface OrderItemInput {
  productId: number;
  variantId?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderInput {
  userId: string;
  total: number;
  shippingAddress: Record<string, any>;
  billingAddress: Record<string, any>;
  items: OrderItemInput[];
}

export async function createOrder(orderData: OrderInput) {
  try {
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

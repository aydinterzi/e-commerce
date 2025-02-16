// lib/actions/paymentActions.ts

"use server";

import { db } from "@/lib/db";
import { payments } from "@/lib/db/schema";

/**
 * Ödeme kaydı oluşturur.
 */
export interface PaymentInput {
  orderId: number;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  paymentStatus?: string;
}

export async function recordPayment(paymentData: PaymentInput) {
  try {
    const newPayment = await db
      .insert(payments)
      .values({
        orderId: paymentData.orderId,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        amount: paymentData.amount,
        paymentStatus: paymentData.paymentStatus || "pending",
      })
      .returning();
    return newPayment;
  } catch (error) {
    console.error("Ödeme kaydı oluşturulurken hata:", error);
    throw error;
  }
}

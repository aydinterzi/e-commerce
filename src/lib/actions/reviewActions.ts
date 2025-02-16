"use server";

import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";

export interface ReviewInput {
  productId: number;
  userId: string;
  rating: number;
  comment?: string;
}

export async function createReview(reviewData: ReviewInput) {
  try {
    const newReview = await db
      .insert(reviews)
      .values({
        productId: reviewData.productId,
        userId: reviewData.userId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      })
      .returning();
    return newReview;
  } catch (error) {
    console.error("Yorum oluşturulurken hata:", error);
    throw error;
  }
}

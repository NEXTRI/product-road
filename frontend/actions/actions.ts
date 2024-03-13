"use server";

import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function updateFeedback(feedbackId: string, formData: FormData) {
  const updatedFields = {
    category: formData.get("category"),
    status: formData.get("status"),
  };
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}feedbacks/${feedbackId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidatePath("/feedback", "layout");
}

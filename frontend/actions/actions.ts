"use server";

import { revalidatePath } from "next/cache";

export async function updateFeedback(feedbackId: string, formData: FormData) {
  const updatedFields = {
    category: formData.get("category"),
    status: formData.get("status"),
  };
  // TODO: add error handling

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}feedbacks/${feedbackId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  revalidatePath(`/feedbacks/${feedbackId}`);
}

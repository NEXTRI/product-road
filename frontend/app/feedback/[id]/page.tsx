import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";
import UpdateForm from "./update-form";

const FeedbackDetail = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  async function getFeedbackDetail(): Promise<Feedback> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}feedbacks/${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  const data = await getFeedbackDetail();
  return (
    <>
      <h1 className="page-title">Feedback Detail</h1>
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/feedback">Feedbacks</BreadcrumbItem>
          <BreadcrumbItem active>{data?.title}</BreadcrumbItem>
        </Breadcrumb>
        <UpdateForm data={data} />
      </div>
      <div className="p-6 my-4 rounded-lg bg-white shadow-gray relative">
        <div className="flex gap-4 items-center mb-8">
          <span className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg">
            {data?.category}
          </span>
          <span className="bg-gold px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            {data?.status}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-3">{data?.title}</h2>
        <p className="text-theme-gray mb-8"> {data?.description}</p>
        <p className="text-theme-purple">_project name</p>
      </div>
    </>
  );
};
export default FeedbackDetail;

"use client";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const FeedbackDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data } = useFetch<Feedback>(`feedbacks/${id}`);

  return (
    <>
      <h1 className="page-title">Feedback Detail</h1>
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/feedback">Feedbacks</BreadcrumbItem>
          <BreadcrumbItem active>{data?.title}</BreadcrumbItem>
        </Breadcrumb>
        <Button variant="theme" className="flex items-center gap-2">
          <Pencil size={18} color="#6e6e6e" /> Edit Feedback
        </Button>
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

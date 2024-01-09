"use client";
import React from "react";
import type { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import useFetch from "../../hooks/useFetch";
const url = "http://localhost:3001/feedbacks";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";

// export const metadata: Metadata = {
//   title: "Feedbacks page",
//   description: "some feedback, to generate later",
// };
const page = () => {
  const { data: feedbacks } = useFetch(url);

  return (
    <>
      <h1 className="page-title">Feedback List</h1>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Feedback</BreadcrumbItem>
      </Breadcrumb>
      {/* add filter */}
      <div className="my-4">
        <DataTable columns={columns} data={feedbacks} />
      </div>
    </>
  );
};

export default page;

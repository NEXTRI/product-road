// "use client";
import React from "react";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";

export const metadata: Metadata = {
  title: "Feedbacks page",
  description: "some feedback, to generate later",
};
const page = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Feedback list</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default page;

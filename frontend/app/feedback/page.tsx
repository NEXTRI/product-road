"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import useFetch from "../../hooks/useFetch";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";

const Feedback = () => {
  const { data: feedbacks } = useFetch("feedbacks");
  const filterOptions = ["category", "status"];

  return (
    <>
      <h1 className="page-title">Feedback List</h1>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem active>Feedback</BreadcrumbItem>
      </Breadcrumb>
      <div className="my-4">
        <DataTable
          columns={columns}
          data={feedbacks}
          filterOptions={filterOptions}
        />
      </div>
    </>
  );
};

export default Feedback;

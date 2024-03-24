import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Breadcrumb, BreadcrumbItem } from "@/components/layouts/breadcrumb";

async function getFeedbacks(): Promise<Feedback[]> {
  const res = await fetch(`http://localhost:3001/feedbacks`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Feedback = async () => {
  const feedbacks = await getFeedbacks();

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
          filterOptions={["category", "status"]}
        />
      </div>
    </>
  );
};

export default Feedback;

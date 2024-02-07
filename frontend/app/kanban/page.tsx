import { KanbanBoard, KanbanHeader } from "@/components/kanban";

const Kanban = () => {
  return (
    <div className="flex flex-col gap-10">
      <KanbanHeader />
      <KanbanBoard />
    </div>
  );
};

export default Kanban;

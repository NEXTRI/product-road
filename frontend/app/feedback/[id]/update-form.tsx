"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { feedbackCategories, feedbackStatus } from "@/data/constants";
import { updateFeedback } from "@/actions/actions";
import { SubmitButton } from "./submit-button";

const UpdateForm = ({ data }: { data: Feedback }) => {
  console.log(data);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function updateFeedbackForm(formData: FormData) {
    formRef.current?.reset();
    const updateFeedbackWithId = updateFeedback.bind(null, data.id);
    const res = await updateFeedbackWithId(formData);
    setOpen(false);
    if (res?.error) {
      toast({
        title: "Uh! Something went wrong.",
        variant: "destructive",
        description: (
          <div className="flex justify-center items-center gap-3">
            <X size={20} /> {res.error} Please Try again.
          </div>
        ),
      });
    } else {
      toast({
        description: (
          <div className="flex justify-center items-center gap-3">
            <Check size={20} color="#3e8f2d" /> Feedback updated successfully
          </div>
        ),
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="theme" className="flex items-center gap-2">
          <Pencil size={18} color="#6e6e6e" /> Edit Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={updateFeedbackForm} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Edit Feedback</DialogTitle>
            <DialogDescription>
              Make changes to your feedback here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="category" defaultValue={data?.category} required>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {feedbackCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="status" defaultValue={data?.status} required>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {feedbackStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;

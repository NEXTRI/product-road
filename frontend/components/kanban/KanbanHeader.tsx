"use client";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { EditAbleContent } from ".";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ListFilter } from "lucide-react";
import { Input } from "../ui/input";
import { CATEGORIES } from "@/data/kanban";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const KanbanHeader = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [{ title, description }, setHeaderData] = useState({
    title: "Roadmap",
    description: "Add a description",
  });
  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
  });
  const [search, setSearch] = useState("");
  const setTitle = (val: string) => {
    setHeaderData((prev) => ({ ...prev, title: val }));
  };
  const setTitleEditMode = (val: boolean) => {
    setEditMode((prev) => ({ ...prev, title: val }));
  };
  const setDescription = (val: string) => {
    setHeaderData((prev) => ({ ...prev, description: val }));
  };
  const setDescriptionEditMode = (val: boolean) => {
    setEditMode((prev) => ({ ...prev, description: val }));
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      values.forEach((val, i) => {
        if (i === 0) {
          params.set(name, val);
        } else {
          params.append(name, val);
        }
      });
      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-2 w-full max-w-lg">
        <div>
          <EditAbleContent
            title={title}
            defaultTitle="Roadmap"
            setTitle={setTitle}
            editMode={editMode.title}
            setEditMode={setTitleEditMode}
            elementType="h3"
            style="text-4xl font-semibold line-clamp-1"
          />
        </div>
        <EditAbleContent
          title={description}
          style="line-clamp-1"
          defaultTitle="Add a description"
          setTitle={setDescription}
          editMode={editMode.description}
          setEditMode={setDescriptionEditMode}
        />
      </div>
      <Popover
        onOpenChange={(open) => {
          if (open === true) setSearch("");
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ListFilter size={20} /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 text-accent-foreground -translate-x-8">
          <div className="border-b p-4">
            <Input
              placeholder="Search by category"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <ul className="p-4 text-sm flex flex-wrap gap-2">
            {CATEGORIES.filter((category) =>
              new RegExp(`^${search}`, "i").test(category.label)
            ).map((category) => (
              <li key={category.id} className="h-fit">
                <label
                  className={cn(
                    "text-sm font-medium leading-none p-2 rounded-lg flex items-center justify-between text-white opacity-50",
                    selectedCategories.includes(category.id) && "opacity-100"
                  )}
                  style={{ backgroundColor: category.color }}
                >
                  {`# ${category.label}`}
                  <Checkbox
                    className="hidden"
                    value={selectedCategories}
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...selectedCategories, category.id]
                        : selectedCategories.filter(
                            (selectedCategory) =>
                              selectedCategory !== category.id
                          );
                      setSelectedCategories(newValues);
                      if (newValues.length === 0) {
                        router.push(pathname);
                        return;
                      }
                      router.push(
                        pathname + "?" + createQueryString("search", newValues)
                      );
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default KanbanHeader;

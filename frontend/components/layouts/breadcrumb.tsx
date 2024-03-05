"use client";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItemProps {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}
// TODO: turn breadcrumbs items dynamic, after setting slug as endpoint instead of id
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  active,
  children,
}) => {
  const itemClass = active ? "text-gray-500" : "text-gray-800";
  return (
    <li className={itemClass}>
      {href ? (
        <a className="flex gap-1 items-center" href={href}>
          {children} <ChevronRight size={14} />
        </a>
      ) : (
        <span>{children}</span>
      )}
    </li>
  );
};

interface BreadcrumbProps {
  children: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return <ul className="breadcrumb flex gap-2">{children}</ul>;
};

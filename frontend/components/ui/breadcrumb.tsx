import React from "react";

interface BreadcrumbItemProps {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  active,
  children,
}) => {
  const itemClass = active ? "text-gray-500" : "text-gray-800";
  return (
    <li className={itemClass}>
      {href ? <a href={href}>{children}</a> : <span>{children}</span>}
    </li>
  );
};

interface BreadcrumbProps {
  children: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return <ul className="breadcrumb">{children}</ul>;
};

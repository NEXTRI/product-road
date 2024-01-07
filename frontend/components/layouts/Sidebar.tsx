import React from "react";
import { Logo, Navigation, ComboboxDemo } from "./index";

const Sidebar = () => {
  return (
    <aside className="bg-white py-8 min-w-60 flex flex-col justify-between">
      <div className="">
        <Logo />
        <ComboboxDemo />
        <Navigation />
      </div>

      <ComboboxDemo />
    </aside>
  );
};

export default Sidebar;

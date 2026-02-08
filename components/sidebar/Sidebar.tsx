"use client";
import { ClipboardList, SearchCheck, Star } from "lucide-react";
import { SidebarItem, SidebarItemProps } from "./SidebarItem";
import { useState } from "react";

export const Sidebar = () => {
  const menuItems: SidebarItemProps[] = [
    { title: "pokemons", path: "/", icon: <ClipboardList /> },
    {
      title: "favorites Selected",
      path: "/favorites",
      icon: <Star />,
      showCountselecteds: true,
    },
    {
      title:"Favorites by Code",
      path:'/favorites/code',
      icon:<SearchCheck />
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 xl:hidden bg-gray-800 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          bg-linear-to-br from-gray-800 to-gray-900
          fixed inset-0 z-50 my-4 ml-4
          h-[calc(100vh-32px)] w-72 rounded-xl
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-80"}
          xl:translate-x-0
        `}
      >
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              POKE-FAVORITES
            </h6>
          </a>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            {menuItems.map((menuItem, index) => {
              return (
                <SidebarItem
                  key={index}
                  title={menuItem.title}
                  icon={menuItem.icon}
                  path={menuItem.path}
                  showCountselecteds={menuItem.showCountselecteds}
                />
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

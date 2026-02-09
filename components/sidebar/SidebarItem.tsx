"use client";

import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  path: string;
  title: string;
  icon: React.ReactNode;
  showCountselecteds?: boolean;
}
export const SidebarItem = ({
  path,
  title,
  icon,
  showCountselecteds,
}: SidebarItemProps) => {
  const pathName = usePathname();

  const total = useFavoritesStore((s) => s.favorites.length);

  return (
    <li>
      <Link aria-current="page" className="active" href={path}>
        <button
          className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize  ${
            pathName == path
              ? "bg-linear-to-tr from-blue-600 to-blue-400  shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
              : "hover:bg-white/10 active:bg-white/30"
          }`}
          type="button"
        >
          {icon}
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
            {title}
          </p>
          {showCountselecteds && (
            <div className={"bg-red-950 w-10 rounded-4xl p-4"}>{total}</div>
          )}
        </button>
      </Link>
    </li>
  );
};

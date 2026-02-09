"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface Props {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", page.toString());

    router.push(`/?${newParams.toString()}`);
  };

  const btnClass = (disabled?: boolean) =>
    clsx(
      "px-4 py-2 rounded font-semibold transition",
      "bg-gray-800 text-white",
      "hover:bg-indigo-600 hover:scale-105",
      {
        "opacity-40 cursor-not-allowed hover:bg-gray-800 hover:scale-100":
          disabled,
        "cursor-pointer": !disabled,
      }
    );

  return (
    <div className="flex justify-center items-center gap-3 py-10 flex-wrap">
      {/* FIRST */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className={btnClass(currentPage === 1)}
      >
        ⏮ First
      </button>

      {/* PREV */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={btnClass(currentPage === 1)}
      >
        ◀ Prev
      </button>

      {/* PAGE INFO */}
      <span className="px-4 font-bold text-slate-700">
        Page {currentPage} / {totalPages}
      </span>

      {/* NEXT */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={btnClass(currentPage === totalPages)}
      >
        Next ▶
      </button>

      {/* LAST */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className={btnClass(currentPage === totalPages)}
      >
        Last ⏭
      </button>
    </div>
  );
};

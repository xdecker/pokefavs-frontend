"use client";

import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import toast from "react-hot-toast";

interface props {
  generatedCode: string;
  onDismiss: () => void;
}
export const ModalCodeFavorites = ({ generatedCode, onDismiss }: props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Your Favorites Code 🎉
        </h2>

        {/* Code + Copy */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl font-mono bg-slate-100 px-4 py-2 rounded">
            {generatedCode}
          </span>

          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedCode);
              toast.success("Code copied");
            }}
            className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
          >
            Copy
          </button>
        </div>

        {/* OK button */}
        <button
          onClick={() => {
            onDismiss();
          }}
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

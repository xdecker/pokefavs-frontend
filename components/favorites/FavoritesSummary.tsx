"use client";

import { onSaveFavorites } from "@/lib/pokefavsapi";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import { sleep } from "@/utils/sleep";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { ModalCodeFavorites } from "./ModalCodeFavorites";

export const FavoritesSummary = () => {
  const favorites = useFavoritesStore((s) => s.favorites);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const onDismissModal = () => {
    useFavoritesStore.getState().clearFavorites();
    setGeneratedCode(null);
  };

  const generateCode = async () => {
    try {
      setGeneratedCode(null);
      setLoading(true);
      //await sleep(3);
      const response = await onSaveFavorites(
        favorites.map((pokemon) => pokemon.name.toLowerCase())
      );
      setGeneratedCode(response.code);
      toast.success("list favorites saved correctly");
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.message && err?.message !== "Failed to fetch"
          ? err.message
          : "Something was wrong. Please try later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm">Total Pokemons</p>
        <p className="text-2xl font-bold text-slate-700">{favorites.length}</p>
      </div>

      <button
        onClick={generateCode}
        disabled={loading}
        className={clsx(
          " text-white font-bold px-6 py-2 rounded-lg  transition",
          {
            "cursor-none bg-gray-700 ": loading,
            "bg-indigo-700 cursor-pointer hover:bg-indigo-700 ": !loading,
          }
        )}
      >
        {!loading ? "Generate Code" : "Loading..."}
      </button>

      {generatedCode && (
        <ModalCodeFavorites
          generatedCode={generatedCode}
          onDismiss={onDismissModal}
        />
      )}
    </div>
  );
};

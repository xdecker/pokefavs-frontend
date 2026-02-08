"use client";

import { onSaveFavorites } from "@/lib/pokefavsapi";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";

export const FavoritesSummary = () => {
  const favorites = useFavoritesStore((s) => s.favorites);

  const generateCode = async () => {
    try{
      const response = await onSaveFavorites(
        favorites.map((pokemon) => pokemon.name.toLowerCase())
      );
      console.log(response);
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm">Total Pokémons</p>
        <p className="text-2xl font-bold text-slate-700">{favorites.length}</p>
      </div>

      <button
        onClick={generateCode}
        className="bg-indigo-700 text-white font-bold cursor-pointer px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Generate Code
      </button>
    </div>
  );
};

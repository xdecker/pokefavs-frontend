"use client";
import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import { Heart, HeartOff } from "lucide-react";

export const FavoriteButton = ({ id, name }: SimplePokemon) => {
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const remove = useFavoritesStore((s) => s.removeFavorite);
  const favorites = useFavoritesStore((s) => s.favorites);

  const favorite = favorites.some((p) => p.id === id.toString());

  const handleClick = () => {
    if (favorite) {
      remove(id);
    } else {
      addFavorite({ id, name });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-3 px-4 py-2 rounded-xl bg-red-100 border-red-700 border text-slate-900 cursor-pointer"
    >
      <div className="flex">
        {favorite ? <HeartOff /> : <Heart fill="red" />} &nbsp;
        {favorite ? "Remove from favorites" : "Add to favorites"}
      </div>
    </button>
  );
};

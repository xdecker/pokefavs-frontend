"use client";

import Image from "next/image";
import { FileHeart, Trash2 } from "lucide-react";
import { EmptyListMessage } from "../ui/EmptyListMessage";
import { FavoritesSummary } from "./FavoritesSummary";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";

export const FavoritesList = () => {
  const favorites = useFavoritesStore((s) => s.favorites);
  const remove = useFavoritesStore((s) => s.removeFavorite);

  if (favorites.length === 0) {
    return (
      <div className="text-center self-center">
        <EmptyListMessage
          message="Your favorites list is empty."
          icon={<div className="text-center self-center center"><FileHeart className="w-10 h-10" /></div>}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* GRID */}
      <div
        className="grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6 
        gap-6"
      >
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center relative"
          >
            {/* REMOVE */}
            <button
              onClick={() => remove(pokemon.id)}
              className="absolute top-2 right-2 text-red-500 hover:scale-110 transition"
            >
              <Trash2 size={18} />
            </button>

            {/* IMAGE */}
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              width={80}
              height={80}
              alt={pokemon.name}
              className="mb-3"
            />

            {/* NAME */}
            <p className="capitalize font-semibold text-slate-700">
              {pokemon.name}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <FavoritesSummary />
    </div>
  );
};

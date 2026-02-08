"use client";

import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import { Heart, HeartOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon;
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const remove = useFavoritesStore((s) => s.removeFavorite);
  const favorites = useFavoritesStore((s) => s.favorites);

  const isFavorite = favorites.some((p) => p.id === id.toString());

  const onToggle = () => {
    if (isFavorite) {
      remove(id);
    } else {
      addFavorite({ id, name });
    }
  };
  return (
    <div className="mx-auto right-0 mt-2 w-60 h-85">
      <div className="flex flex-col h-full bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center flex-1 p-6 bg-gray-800 border-b">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            key={id}
            width={100}
            height={100}
            alt={name}
            priority={false}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>

          <div className="mt-5">
            <Link
              href={`/pokemon/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 hover:bg-gray-200 hover:text-slate-800"
            >
              Más Información
            </Link>
          </div>
        </div>

        <div className="border-b">
          <div
            onClick={onToggle}
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          >
            <div className="text-red-600">
              {isFavorite ? <HeartOff /> : <Heart fill="red" />}
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

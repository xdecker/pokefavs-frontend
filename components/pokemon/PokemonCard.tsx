"use client";

import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon;
  const isFavorite = false;
  const onToggle = () => {
    console.log(pokemon);
    //dispatch(toggleFavorite(pokemon));
  };
  return (
    <div className="mx-auto right-0 mt-2 w-60 h-80">
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
              href={`pokemon/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 hover:bg-gray-200 hover:text-slate-800"
            >
              Más Información
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

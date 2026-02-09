"use client";

import { useEffect, useState } from "react";
import { getFavoritesByCode } from "@/lib/pokefavsapi";
import { PokemonList } from "@/components/pokemon/PokemonList";
import toast from "react-hot-toast";
import { SimplePokemon } from "@/interfaces/simple-pokemon";
import clsx from "clsx";

export default function FavoritesByCodePage() {
  const [code, setCode] = useState("");
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onClear();
  }, []);

  const onClear = () => {
    setCode("");
    setPokemons([]);
  };

  const onSearch = async () => {
    if (code.length > 0) {
      //we defined in backend that code have length 10
      if (code.length < 10) {
        toast.error("Please use a valid code.");
        return;
      }

      try {
        setLoading(true);

        const resp = await getFavoritesByCode(code);
        console.log(resp);
        if (resp) {
          if (resp.error) {
            toast.error(resp.error ?? "Something was wrong. Please, try again");
          } else {
            toast.success("Favorites loaded correctly");
            setPokemons(resp.pokemons);
          }
        }
      } catch (err: any) {
        toast.error("Invalid code");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 m-3">
      {/* Input */}
      <div className="flex gap-2 bg-white">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none "
        />

        <button
          onClick={onSearch}
          disabled={loading}
          className={clsx(
            " text-white font-bold px-6 py-2 rounded-lg  transition",
            {
              "cursor-not-allowed bg-gray-700 ": loading,
              "bg-indigo-700 cursor-pointer hover:bg-indigo-700 ": !loading,
            }
          )}
        >
          {!loading ? "Search" : "Loading..."}
        </button>
        <button
          onClick={onClear}
          disabled={loading}
          className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* Lista reutilizada */}
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

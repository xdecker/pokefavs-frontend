import { PokemonList } from "@/components";
import { getAllPokemons } from "@/lib/pokeapi";

export default async function Home() {
  const pokemonsData = await getAllPokemons(151);
  return (
    <>
      <h1 className="text-3xl m-3 font-semibold text-slate-700 my-3">
        See All the pokemons
      </h1>

      <div className="flex flex-col">
        <PokemonList pokemons={pokemonsData} />
      </div>
    </>
  );
}

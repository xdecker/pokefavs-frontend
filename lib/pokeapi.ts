import { PokemonResponse } from "@/interfaces/pokemonResponse";
import { PokemonsResponse } from "@/interfaces/pokemonsResponse";
import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { notFound } from "next/navigation";

const POKEAPI_URL = process.env.POKEAPI_URL;

export async function getAllPokemons(limit: number = 20, offset: number = 0) {
  const response: PokemonsResponse = await fetch(
    `${POKEAPI_URL}?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  //simplify information to list
  const pokemons: SimplePokemon[] = response.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!, //https://pokeapi.co/api/v2/pokemon/1/"
    name: pokemon.name,
  }));
  return pokemons;
}

export async function searchPokemon(name: string) {
  const res = await fetch(`${POKEAPI_URL}/${name.toLowerCase()}`);

  if (!res.ok) throw new Error("Pokemon not found");

  return res.json();
}

export async function getDetailPokemon(name: string): Promise<PokemonResponse>  {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      cache: "force-cache",
    }).then((resp) => resp.json());

    console.log("se cargó ", pokemon.name);
    return pokemon;
  } catch (err) {
    notFound();
  }
}

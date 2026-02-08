import { FavoriteConsultResponse } from "@/interfaces/favoriteConsultResponse";
import { SimplePokemon } from "@/interfaces/simple-pokemon";

const POKEFAVAPI_URL = process.env.NEXT_PUBLIC_API_URL;

export const onSaveFavorites = async (favorites: SimplePokemon[]) => {
  const res = await fetch(`${POKEFAVAPI_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pokemons: favorites,
    }),
  });

  const data = await res.json();
  return data;
};

export const getFavoritesByCode = async (code: string) => {
  if (code.length > 0) {
    const res:FavoriteConsultResponse = await fetch(`${POKEFAVAPI_URL}/favorites/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    
    return res;
  }
};

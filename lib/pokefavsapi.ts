import { FavoriteConsultResponse } from "@/interfaces/favoriteConsultResponse";
import { SimplePokemon } from "@/interfaces/simple-pokemon";

const POKEFAVAPI_URL = process.env.NEXT_PUBLIC_API_URL;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "";
};

export const onSaveFavorites = async (favorites: SimplePokemon[]) => {
  const res = await fetch(`${getApiUrl()}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pokemons: favorites,
    }),
  });

  if (!res.ok) {
    throw new Error("Error saving favorites");
  }

  const data = await res.json();
  return data;
};

export const getFavoritesByCode = async (code: string) => {
  if (!code.length) {
    throw new Error("Code is required");
  }

  const res: FavoriteConsultResponse = await fetch(
    `${getApiUrl()}/favorites/${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return res;
};

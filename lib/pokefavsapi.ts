
const POKEFAVAPI_URL = process.env.NEXT_PUBLIC_API_URL;

export const onSaveFavorites = async (favorites:string[]) => {
    const res = await fetch(
      `${POKEFAVAPI_URL}/favorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pokemons: favorites,
        }),
      }
    );

    const data = await res.json();
    return data;
  };
const POKEAPI_URL = process.env.POKEAPI_URL;

export async function getAllPokemons(limit:number = 20, offset:number = 0){

}

export async function searchPokemon(name: string) {
    const res = await fetch(
      `${POKEAPI_URL}/${name.toLowerCase()}`
    );
  
    if (!res.ok) throw new Error('Pokemon not found');
  
    return res.json();
  }
  
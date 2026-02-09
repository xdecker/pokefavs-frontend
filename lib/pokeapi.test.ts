import { getAllPokemons, searchPokemon } from "./pokeapi";
import { describe, it, expect, vi, beforeEach } from "vitest";

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAllPokemons", () => {
  it("return simple info of pokemons", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({
        count: 2,
        results: [
          {
            name: "pikachu",
            url: "https://pokeapi.co/api/v2/pokemon/25/",
          },
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        ],
      }),
    });

    const data = await getAllPokemons(20, 0);

    expect(data.total).toBe(2);

    expect(data.pokemons).toEqual([
      { id: "25", name: "pikachu" },
      { id: "1", name: "bulbasaur" },
    ]);
  });
});

describe("searchPokemon", () => {
  it("return pokemon if exists", async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: "pikachu" }),
    });

    const data = await searchPokemon("pikachu");

    expect(data.name).toBe("pikachu");
  });

  it("throw error if not  exist", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    await expect(searchPokemon("fake")).rejects.toThrow("Pokemon not found");
  });
});

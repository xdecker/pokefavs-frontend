import { describe, it, expect, vi, beforeEach } from "vitest";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";

global.fetch = vi.fn() as any;

import { onSaveFavorites, getFavoritesByCode } from "./pokefavsapi";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createFavorites", () => {
  it("send favorite list", async () => {
    const mockResponse = {
      code: "ABC123",
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const pokemons = [
      { name: "pikachu", id: "25" },
      { name: "bulbasaur", id: "1" },
    ];

    const res = await onSaveFavorites(pokemons);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/favorites",
      expect.objectContaining({
        method: "POST",
      })
    );

    expect(res.code).toBe("ABC123");
  });
});

describe("getFavoritesByCode", () => {
  it("get favorites by code", async () => {
    const mockResponse = {
      pokemons: [{ name: "pikachu", id: "25" }],
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const res = await getFavoritesByCode("ABC123");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/favorites/ABC123",
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(res.pokemons.length).toBe(1);
  });
});

import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavoritesStore } from "./favorites.store";


beforeEach(() => {
  const storageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(global, "localStorage", {
    value: storageMock,
  });

  // Reset Zustand state
  useFavoritesStore.setState({ favorites: [] });
});

const pikachu = { id: "25", name: "pikachu" };
const bulbasaur = { id: "1", name: "bulbasaur" };

describe("favorites.store", () => {
  it("adds a pokemon to favorites", () => {
    useFavoritesStore.getState().addFavorite(pikachu);

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual(pikachu);
  });

  it("does not add duplicates", () => {
    const store = useFavoritesStore.getState();

    store.addFavorite(pikachu);
    store.addFavorite(pikachu);

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites.length).toBe(1);
  });

  it("adds multiple pokemons", () => {
    const store = useFavoritesStore.getState();

    store.addFavorite(pikachu);
    store.addFavorite(bulbasaur);

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites.length).toBe(2);
  });

  it("removes a pokemon", () => {
    const store = useFavoritesStore.getState();

    store.addFavorite(pikachu);
    store.removeFavorite("25");

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites.length).toBe(0);
  });

  it("clears all favorites", () => {
    const store = useFavoritesStore.getState();

    store.addFavorite(pikachu);
    store.addFavorite(bulbasaur);

    store.clearFavorites();

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites.length).toBe(0);
  });
});

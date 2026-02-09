import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: SimplePokemon[];

  addFavorite: (pokemon: SimplePokemon) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (pokemon) => {
        const exists = get().favorites.find((p) => p.id === pokemon.id);

        if (exists) return;

        set({
          favorites: [...get().favorites, pokemon],
        });
      },

      removeFavorite: (id) => {
        set({
          favorites: get().favorites.filter((p) => p.id !== id),
        });
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);

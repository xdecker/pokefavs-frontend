import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PokemonCard } from "./PokemonCard";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("next/link", () => ({
  default: ({ children }: any) => <a>{children}</a>,
}));

const addFavoriteMock = vi.fn();
const removeFavoriteMock = vi.fn();

let favoritesMock: any[] = [];

vi.mock("@/stores/favorites/favorites.store", () => ({
  useFavoritesStore: (selector: any) =>
    selector({
      favorites: favoritesMock,
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
    }),
}));

const pokemon = {
  id: "25",
  name: "pikachu",
};

describe("PokemonCard", () => {
  beforeEach(() => {
    favoritesMock = [];
    vi.clearAllMocks();
  });

  it("renders pokemon name", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("shows Add to favorites when not favorite", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("Add to favorites")).toBeInTheDocument();
  });

  it("shows Remove from favorites when favorite", () => {
    favoritesMock = [pokemon];

    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("Remove from favorites")).toBeInTheDocument();
  });

  it("calls addFavorite when clicking add", () => {
    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByText("Add to favorites"));

    expect(addFavoriteMock).toHaveBeenCalledWith({
      id: "25",
      name: "pikachu",
    });
  });

  it("calls removeFavorite when clicking remove", () => {
    favoritesMock = [pokemon];

    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByText("Remove from favorites"));

    expect(removeFavoriteMock).toHaveBeenCalledWith("25");
  });

  it("renders detail link", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("Más Información")).toBeInTheDocument();
  });
});

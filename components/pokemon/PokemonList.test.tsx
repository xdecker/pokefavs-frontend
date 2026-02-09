import { render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";

describe("PokemonList", () => {
  it("show pokemons", () => {
    render(<PokemonList pokemons={[{ id: "25", name: "pikachu" }]} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("show empty message", () => {
    render(<PokemonList pokemons={[]} />);

    expect(screen.getByText(/we dont have any pokemons/i)).toBeInTheDocument();
  });
});

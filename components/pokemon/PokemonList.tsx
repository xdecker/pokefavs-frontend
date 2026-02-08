import { SimplePokemon } from "@/interfaces/simple-pokemon";
import { PokemonCard } from "./PokemonCard";
import { EmptyListMessage } from "../EmptyListMessage";
import { OctagonAlert } from "lucide-react";

interface Props {
  pokemons: SimplePokemon[];
}

export const PokemonList = ({ pokemons }: Props) => {
  return (
    <div className="flex flex-wrap gap-10">
      {pokemons.map((pokemon, index) => {
        return <PokemonCard pokemon={pokemon} key={index} />;
      })}

      {pokemons.length === 0 && (
        <div className="flex w-full justify-center items-center py-10">
          <EmptyListMessage
            message="We dont have any pokemons to show you right now"
            icon={<OctagonAlert className="w-16 h-16" />}
          />
        </div>
      )}
    </div>
  );
};

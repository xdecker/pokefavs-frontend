import { SimplePokemon } from "./simple-pokemon";

export interface FavoriteConsultResponse{
    id: string;
    code: string;
    pokemons: SimplePokemon[];
    createdAt: Date;
    error?: string;
}
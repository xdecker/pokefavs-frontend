import { Pagination, PokemonList } from "@/components";
import { getAllPokemons } from "@/lib/pokeapi";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page ?? 1);
  const limit = 50;
  const offset = (page - 1) * limit;

  const { pokemons, total } = await getAllPokemons(limit, offset);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <h1 className="text-3xl m-3 font-semibold text-slate-700 my-3">
        See All the pokemons
      </h1>

      <PokemonList pokemons={pokemons} />

      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

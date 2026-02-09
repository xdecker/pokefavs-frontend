import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { getDetailPokemon } from "@/lib/pokeapi";
import { pokemonTypeColors } from "@/utils/pokemon/pokemonTypeColors";
import Image from "next/image";
interface Props {
  params: { name: string };
}

export default async function PokemonDetailPage(prop: Props) {
  const param = await prop.params;
  const pokemon = await getDetailPokemon(param.name);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex-row flex w-full items-center mb-2">
          <div className="flex-1">
            <h1 className="text-3xl font-bold capitalize text-slate-800">
              #{pokemon.id} {pokemon.name}
            </h1>
          </div>
          <div className="flex-1 text-right">
            <FavoriteButton id={pokemon.id.toString()} name={pokemon.name} />
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT — IMAGE */}
          <div className="flex justify-center items-center bg-slate-100 rounded-xl p-6">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={300}
              height={300}
              alt={pokemon.name}
              priority
            />
          </div>

          {/* RIGHT — INFO */}
          <div className="flex flex-col gap-6">
            {/* TYPES */}
            <div>
              <p className="text-md text-gray-500 mb-2 font-bold">Types</p>

              <div className="flex gap-2">
                {pokemon.types.map((type) => {
                  const name = type.type.name;

                  return (
                    <span
                      key={name}
                      className={`px-3 py-1 rounded-full text-white text-sm capitalize font-semibold border-2 ${
                        pokemonTypeColors[name] ?? "bg-gray-500"
                      }`}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* ABILITIES */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Abilities</p>

              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ab) => (
                  <span
                    key={ab?.ability?.name}
                    className="bg-slate-200 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {ab?.ability?.name}
                  </span>
                ))}
              </div>
            </div>

            {/* HEIGHT + WEIGHT */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Height</p>
                <p className="font-semibold text-lg">{pokemon.height / 10} m</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Weight</p>
                <p className="font-semibold text-lg">
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Base Stats</h2>

          <div className="flex flex-col gap-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm mb-1 capitalize">
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{
                      width: `${stat.base_stat > 100 ? 100 : stat.base_stat}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPRITES */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {/* Regular */}
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500 mb-3">Regular</p>

            <div className="flex justify-center gap-4">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt="front"
              />
              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt="back"
              />
            </div>
          </div>

          {/* Shiny */}
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500 mb-3">Shiny</p>

            <div className="flex justify-center gap-4">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt="front shiny"
              />
              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt="back shiny"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

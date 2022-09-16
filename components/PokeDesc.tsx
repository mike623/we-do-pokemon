import React from "react";
import { GetPokemonByNameQuery, PokemonsQuery } from "./pokemon-urql";

type PokeDescProps = {
  i: GetPokemonByNameQuery["getPokemon"] | PokemonsQuery["getFuzzyPokemon"][0];
};
export function PokeDesc(props: PokeDescProps) {
  return (
    <div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.i.key}</div>
        {props.i.flavorTexts.map((ii) => {
          return (
            <p key={ii.flavor} className="text-gray-700 text-base">
              {ii.flavor}
            </p>
          );
        })}
      </div>
      <div className="px-6 pt-4 pb-2">
        {props.i.types.map((type) => (
          <span
            key={type}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

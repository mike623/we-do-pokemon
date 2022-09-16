import React from "react";
import { PokemonEnum, PokemonsQuery } from "./pokemon-urql";

type ResultListProps = {
  pokes?: PokemonsQuery["getFuzzyPokemon"];
  setIsOpen: () => void;
  setPokeKey: (d: PokemonEnum) => void;
};
export function ResultList(props: ResultListProps) {
  return (
    <div className="gap-8 columns-1 sm:columns-2 md:columns-3">
      {props.pokes?.map((i) => {
        return (
          <div
            key={i.key}
            className="max-w-sm rounded overflow-hidden shadow-lg mb-6 hover:bg-orange-100"
            role="button"
            onClick={() => {
              props.setIsOpen();
              props.setPokeKey(i.key);
            }}
          >
            <div className="my-5">
              <img className="mx-auto" src={i.sprite} alt={i.key} />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{i.key}</div>
              {i.flavorTexts.map((ii) => {
                return (
                  <p key={ii.flavor} className="text-gray-700 text-base">
                    {ii.flavor}
                  </p>
                );
              })}
            </div>
            <div className="px-6 pt-4 pb-2">
              {i.types.map((type) => (
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
      })}
    </div>
  );
}

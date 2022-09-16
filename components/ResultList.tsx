import React from "react";
import { PokeDesc } from "./PokeDesc";
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
            <PokeDesc i={i}></PokeDesc>
          </div>
        );
      })}
    </div>
  );
}

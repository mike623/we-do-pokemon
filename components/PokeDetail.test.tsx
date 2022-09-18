import React from "react";
import { render, screen } from "@testing-library/react";
import { PokeDetail } from "./PokeDetail";
import { GetPokemonByNameQuery } from "./pokemon-urql";

const props = {
  pokeDetail: {
    height: 1.7,
    key: "volcanion",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/volcanion.gif",
    flavorTexts: [
      {
        flavor:
          "It expels its internal steam from the arms on its back. It has enough power to blow away a mountain.",
        __typename: "Flavor",
      },
    ],
    baseStats: {
      hp: 80,
      attack: 110,
      defense: 120,
      specialattack: 130,
      specialdefense: 90,
      speed: 70,
      __typename: "Stats",
    },
    evYields: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialattack: 3,
      specialdefense: 0,
      speed: 0,
      __typename: "EvYields",
    },
    types: ["Fire", "Water"],
    __typename: "Pokemon",
  },
};

/**
 * TODO
 * better handle on chart test
 */
describe("PokeDetail", () => {
  it("should render correctly", async () => {
    render(
      <PokeDetail
        pokeDetail={props.pokeDetail as GetPokemonByNameQuery["getPokemon"]}
      />
    );
    await screen.findByText("volcanion");
  });
});

import React, { PropsWithChildren } from "react";
import { createClient, gql, Provider } from "urql";
import {
  GetPokemonByNameQuery,
  GetPokemonByNameQueryVariables,
  GetPokemonByNameDocument,
  PokemonEnum,
} from "../components/pokemon-urql";

export const URL = "https://graphqlpokemon.favware.tech/";
export const client = createClient({
  url: URL,
});

export const getPokeByName = async ({ pokemon }: { pokemon: PokemonEnum }) => {
  let poke;
  const pokeResult = await client
    .query<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(
      GetPokemonByNameDocument,
      { pokemon: pokemon }
    )
    .toPromise();
  if (pokeResult.data?.getPokemon) poke = pokeResult.data?.getPokemon;
  return poke;
};

export const GqlProvider = (props: PropsWithChildren) => (
  <Provider value={client}>{props.children}</Provider>
);

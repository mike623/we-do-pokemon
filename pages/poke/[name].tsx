import { GetServerSideProps } from "next";
import { PokeDetail } from "../../components/PokeDetail";
import {
  GetPokemonByNameDocument,
  GetPokemonByNameQuery,
  GetPokemonByNameQueryVariables,
  PokemonEnum,
} from "../../components/pokemon-urql";
import { client } from "../../services/gql";

function PokeDetailPage({
  poke,
}: {
  poke: GetPokemonByNameQuery["getPokemon"];
}) {
  return (
    <div className="max-w-2xl mx-auto my-10">
      <PokeDetail pokeDetail={poke} />
      {/* <pre>{JSON.stringify(poke, null, 2)}</pre> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let poke = {};
  if (context?.params?.name) {
    const result = await client
      .query<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(
        GetPokemonByNameDocument,
        { pokemon: context.params.name as PokemonEnum }
      )
      .toPromise()
      .then((d) => d.data?.getPokemon);
    if (result) poke = result;
  }
  console.log({ poke });
  return {
    props: { poke: poke }, // will be passed to the page component as props
  };
};

export default PokeDetailPage;

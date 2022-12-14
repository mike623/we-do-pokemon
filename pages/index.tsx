import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import MyModal from "../components/PokeDetailModal";
import {
  GetPokemonByNameQuery,
  PokemonEnum,
  PokemonsQuery,
  usePokemonsQuery,
} from "../components/pokemon-urql";
import { ResultList } from "../components/ResultList";
import { SearchBar } from "../components/SearchBar";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useRouter } from "next/router";

const Home: NextPage<{
  defaultName: string;
}> = ({ defaultName = "" }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState(defaultName);
  const [result] = usePokemonsQuery({
    variables: { name, page: currentPage },
    pause: !name,
  });
  const [searchResult, setSearchResult] = useState<
    PokemonsQuery["getFuzzyPokemon"]
  >([]);

  let [isOpen, setIsOpen] = useState(false);
  let [pokeKey, setPokeKey] = useState<PokemonEnum>();

  const loadMore = () => {
    setCurrentPage((p) => p + 1);
  };
  const [sentryRef] = useInfiniteScroll({
    onLoadMore: loadMore,
    // API not support?
    hasNextPage: true,
    loading: result.fetching,
    disabled: !!result.error,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    if ((result.data?.getFuzzyPokemon?.length || 0) <= 0) return;
    const dd = result.data?.getFuzzyPokemon as PokemonsQuery["getFuzzyPokemon"];

    setSearchResult((p) => [...p, ...dd]);
  }, [result.data]);

  useEffect(() => {
    router.push("/?name=" + name, undefined, { shallow: true });
  }, [name]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>We Do Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-3xl space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/assets/img/wedo-logo-colour.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            We Do Pokemon
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Search your lovely Pokemon and rate it!
          </p>
        </div>

        <SearchBar
          name={name}
          onChange={(e) => {
            // isNewSearch.current = true;
            setSearchResult([]);
            setName(e.target.value);
          }}
        />

        {/* search result */}
        <ResultList
          pokes={searchResult}
          setIsOpen={() => setIsOpen((p) => !p)}
          setPokeKey={setPokeKey}
        />

        {!!name && (
          <div ref={sentryRef}>
            <div role="status">
              <svg
                aria-hidden="true"
                className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <MyModal pokemon={pokeKey} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let poke: GetPokemonByNameQuery["getPokemon"] | null = null;
  const randomIdx = Math.floor(
    Math.random() * Object.values(PokemonEnum).length
  );
  const name = context?.query.name || Object.values(PokemonEnum)[randomIdx];
  return {
    props: { poke, pokes: [], defaultName: name }, // will be passed to the page component as props
  };
};

export default Home;

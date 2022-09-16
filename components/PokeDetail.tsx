import { useLocalStorage } from "../hooks/useLocalStorage";
import { Ability } from "./AbilityChart";
import { GetPokemonByNameQuery } from "./pokemon-urql";
import Star from "/public/assets/img/star.svg";
type PokeMeta = {
  rate: number;
  comment: string;
};
type UserPokeMeta = Record<string, PokeMeta>;
type PokeDetailProps = {
  pokeDetail: GetPokemonByNameQuery["getPokemon"];
};
export const PokeDetail = ({ pokeDetail }: PokeDetailProps) => {
  const [userPokeMeta, setUserPokeMeta] = useLocalStorage<UserPokeMeta>(
    "wedo:poke:meta",
    {}
  );
  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <div>
            <img className="mx-auto" src={pokeDetail.sprite} alt="sprite" />
          </div>
          <div className="my-3">
            <p className="text-sm text-gray-500">
              {pokeDetail?.flavorTexts[0]?.flavor}
            </p>
          </div>
          <div className="flex items-center mt-1">
            {new Array(5).fill(0).map((_, idx) => {
              return (
                <Star
                  key={idx}
                  onClick={() =>
                    setUserPokeMeta((d) => ({
                      ...d,
                      [pokeDetail.key]: {
                        ...d[pokeDetail.key],
                        rate: idx + 1,
                      },
                    }))
                  }
                  className={`w-10 h-10 ${
                    idx + 1 <= userPokeMeta?.[pokeDetail.key]?.rate
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-500"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <Ability
            baseStats={pokeDetail.baseStats}
            evYields={pokeDetail.evYields}
          />
        </div>
      </div>
    </div>
  );
};

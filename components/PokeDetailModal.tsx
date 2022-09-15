import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PokemonEnum, useGetPokemonByNameQuery } from "./pokemon-urql";
import Star from "/public/assets/img/star.svg";

type PokeMeta = {
  rate: number;
  comment: string;
};
type UserPokeMeta = Record<string, PokeMeta>;

export default function MyModal({
  setIsOpen,
  isOpen = false,
  pokemon,
}: {
  setIsOpen: (d: boolean) => void;
  isOpen: boolean;
  pokemon?: PokemonEnum;
}) {
  const [userPokeMeta, setUserPokeMeta] = useLocalStorage<UserPokeMeta>(
    "wedo:poke:meta",
    {}
  );
  const [result] = useGetPokemonByNameQuery({
    variables: { pokemon: pokemon as PokemonEnum },
    pause: !pokemon,
  });
  const pokeDetail = result?.data?.getPokemon;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    {pokeDetail?.key || pokemon}
                  </Dialog.Title>
                  {!result.fetching && pokeDetail && (
                    <>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {pokeDetail?.flavorTexts[0]?.flavor}
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div>

                      <div className="flex items-center">
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
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

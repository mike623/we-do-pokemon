import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PokeDetail } from "./PokeDetail";
import { PokemonEnum, useGetPokemonByNameQuery } from "./pokemon-urql";

export default function MyModal({
  setIsOpen,
  isOpen = false,
  pokemon,
}: {
  setIsOpen: (d: boolean) => void;
  isOpen: boolean;
  pokemon?: PokemonEnum;
}) {
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    {pokeDetail?.key || pokemon}
                  </Dialog.Title>
                  {!result.fetching && pokeDetail && (
                    <div>
                      <PokeDetail pokeDetail={pokeDetail} />
                    </div>
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

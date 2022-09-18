import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PokeDetail } from "./PokeDetail";
import { PokemonEnum, useGetPokemonByNameQuery } from "./pokemon-urql";
import Check from "../public/assets/img/check.svg";
import Share from "../public/assets/img/share.svg";
import Close from "../public/assets/img/close.svg";

export default function MyModal({
  setIsOpen,
  isOpen = false,
  pokemon,
}: {
  setIsOpen: (d: boolean) => void;
  isOpen: boolean;
  pokemon?: PokemonEnum;
}) {
  const [copied, setCopied] = useState(false);
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
  useEffect(() => {
    setCopied(false);
  }, [pokemon]);

  const onShareClick: () => void = () => {
    if (navigator.share) {
      const shareData = {
        title: "We Do Poke",
        text: "See This Poke!",
        url: location.origin + "/poke/" + pokemon,
      };
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(location.origin + "/poke/" + pokemon);
    }
    setCopied(true);
  };

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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    <div className="flex">
                      <span>{pokeDetail?.key || pokemon}</span>
                      <div className="mx-3">
                        <div
                          role="button"
                          className="flex"
                          onClick={onShareClick}
                        >
                          <Share className="w-6 h-6" />
                        </div>
                      </div>

                      <div>
                        {copied && (
                          <Check className="w-6 h-6 ml-3 fill-orange-100" />
                        )}
                      </div>
                    </div>
                    <a role="button" onClick={() => setIsOpen(false)}>
                      <Close className="w-6 h-6 text-gray-900 fill-orange-100" />
                    </a>
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

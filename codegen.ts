import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphqlpokemon.favware.tech/",
  documents: ["./services/operation.graphql"],
  generates: {
    // "./components/pokemon-types.ts": {
    //   plugins: ["typescript"],
    // },
    "./components/pokemon-urql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
      },
    }
  },
};

export default config;

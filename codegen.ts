/* https://www.apollographql.com/tutorials/lift-off-part1/09-codegen */
import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({
  path: "config/.env",
});

const config: CodegenConfig = {
  schema: [
    process.env.REACT_APP_BACKEND_API,
    process.env.REACT_APP_INTEROP_SERVICE_URL,
  ],
  documents: ["src/**/*.{js,jsx,ts,tsx}"],
  generates: {
    "./src/generated-types/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/generated-types/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;

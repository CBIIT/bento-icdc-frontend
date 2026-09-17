/* https://www.apollographql.com/tutorials/lift-off-part1/09-codegen */
import { CodegenConfig } from '@graphql-codegen/cli';
import fs from 'fs';
import path from 'path';

// Load environment variables from public/injectEnv.js
const injectEnvPath = path.join(__dirname, 'public', 'injectEnv.js');
const injectEnvContent = fs.readFileSync(injectEnvPath, 'utf-8');
const envMatch = injectEnvContent.match(
  /window\.injectedEnv\s*=\s*({[\s\S]*?});/
);

let injectedEnv: Record<string, string> = {};
if (envMatch) {
  // Use eval to parse the object literal (safe here as we're reading our own config file)
  injectedEnv = eval(`(${envMatch[1]})`) as Record<string, string>;
}

const backendSchema =
  process.env.REACT_APP_BACKEND_API || injectedEnv.REACT_APP_BACKEND_API;
const interopSchema =
  process.env.REACT_APP_INTEROP_SERVICE_URL ||
  injectedEnv.REACT_APP_INTEROP_SERVICE_URL;
const backendDocuments = ['src/**/*.{js,jsx,ts,tsx}'];
const interopDocuments = ['src/graphql/interop/storeManifest.graphql'];

const config: CodegenConfig = {
  generates: {
    './src/generated-types/': {
      schema: backendSchema,
      documents: backendDocuments,
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './src/generated-types/types.ts': {
      schema: backendSchema,
      documents: backendDocuments,
      plugins: ['typescript', 'typescript-operations'],
    },
    './src/generated-types/interop/': {
      schema: interopSchema,
      documents: interopDocuments,
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;

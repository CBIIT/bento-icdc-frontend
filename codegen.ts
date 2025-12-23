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

const config: CodegenConfig = {
  schema: [
    process.env.REACT_APP_BACKEND_API || injectedEnv.REACT_APP_BACKEND_API,
    process.env.REACT_APP_INTEROP_SERVICE_URL ||
      injectedEnv.REACT_APP_INTEROP_SERVICE_URL,
  ].filter(Boolean),
  documents: ['src/**/*.{js,jsx,ts,tsx}'],
  generates: {
    './src/generated-types/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './src/generated-types/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;

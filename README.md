# Project Documentation

## Table of Contents

- [Overview](#overview)
- [Quickstart](#quickstart)
- [Scripts](#scripts)
- [Contribution Workflow](#contribution-workflow)
- [TypeScript](#typescript)
    - [Learning resources](#learning-resources)
- [GraphQL Code Generator](#troubleshooting)
    - [Usage](#usage)
    - [Running Codegen](#running-codegen)
    - [Example Query Using Typed GraphQL Document](#example-query-using-typed-graphql-document)
- [ESLint and Prettier](#eslint-and-prettier)
    - [Usage](#usage)
- [Husky & Pre-Commit Hooks](#husky-pre-commit-hooks)
    - [Hooks](#hooks)
- [Environment Variables](#environment-variables)
    - [File Precedence](#file-precedence)
    - [Usage](#usage)
        - [.env.example](#envexample)
- [Material-UI v6 Migration](#material-ui-v6-migration)
    - [Guidelines for Migration](#guidelines-for-migration) 
        - [Example Using adaptV4Theme to Wrap MUI v4 Components](#example-using-adaptv4theme-to-wrap-mui-v4-components)
- [Additional Resources](#additional-resources)
- [Support](#support)

## Overview

Welcome to the project! This README explains the setup for TypeScript, GraphQL Codegen, ESLint, Prettier, Husky hooks, environment variables, 
and the migration to Material-UI v6.

## Quickstart

We use **NVM (Node Version Manager)** to ensure everyone is using the correct Node.js version. Follow these steps:

1. Ensure [NVM is installed](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Run `nvm use` in the project root to switch to the correct Node version (as specified in `.nvmrc`).
3. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
4. Set up your editior to use [Prettier](https://prettier.io/docs/en/editors).
5. Create a `.env` file in `config/` Reach out to team member for values. Read [this](#environment-variables) section.
6. Start dev server:
    ```
    npm run dev
    ```
7. Happy Hacking!

## Scripts
| Description              | Command            |
|--------------------------|--------------------|
| Start Development Server | `npm run dev`      |
| Run GraphQL Codegen      | `npm run generate` |
| Run Linting Engine       | `npm run lint`     |
| Run Formatting engine    | `npm run format`   |
| Create production bundle | `npm run build`    |
| Start production server  | `npm run serve`    |


## Contribution Workflow
- Create a new branch for your feature or fix.
    - feature: `feature/<issue-number>`. eg `feature/ICDC-0001`.
    - bugfix: `bugfix/<issue-number>`. eg `bugfix/ICDC-0001`.
    - hotfix: `hotfix/<issue-number>`. eg `hotfix/ICDC-0001`. 
    - These rules will be enforced by husky pre-push hooks.
- Run code generation, linting, and formatting as needed.
- Commit changes (pre-commit hooks will enforce linting and formatting).
- Push your branch and open a pull request.

## TypeScript
The project is set up to support [TypeScript](https://www.typescriptlang.org/) to improve type safety and code quality. 
We are gradually transitioning existing JavaScript files to TypeScript. **Convert any JavaScript files you work on to TypeScript (.ts or .tsx)**.

### Learning resources
- [TS for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).
- [TypeScript for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

## GraphQL Code Generator
[GraphQL Codegen](https://the-guild.dev/graphql/codegen/docs/getting-started) automatically generates TypeScript types and operations for GraphQL queries and mutations,
making it easier to use typed queries throughout the codebase.

### Usage
**Configuration:** Codegen settings are in `codegen.ts`.
**Documents and Schema**: The configuration specifies the documents (GraphQL queries) and schema endpoints, pulling in all files with .graphql, .gql, .js, .jsx, .ts, and .tsx extensions.
**Generated Files**: TypeScript types and hooks for GraphQL operations are saved in `src/generated-types/gql.ts`.

### Running Codegen
To generate or refresh types, run:

```
npm run generate
```

This command will scan your GraphQL documents and schema to produce TypeScript types for queries, mutations, and subscriptions as well as a typed Document that can be used in a `useQuery` hook.

#### Example Query Using Typed GraphQL Document
Here’s an example of how to use the generated types with a GraphQL query in your React components.

- Define the Query with gql: Use gql from graphql-tag to define the query. Codegen will automatically generate TypeScript types for queries defined in your codebase.

- Use the Typed Document: Use the generated query document and types in your component.

```
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";
import { GetUserDocument, GetUserQuery, GetUserQueryVariables } from "./generated-types";

// Define the GraphQL query using gql
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

// Use the generated types and document in a React component
const MyComponent = () => {
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: { id: "user-id" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User Info</h2>
      <p>ID: {data?.user.id}</p>
      <p>Name: {data?.user.name}</p>
      <p>Email: {data?.user.email}</p>
    </div>
  );
};

export default MyComponent;
```

## ESLint and Prettier
We use ESLint for code quality and Prettier for code formatting.

### Usage
- ESLint rules are defined in `eslint.config.mjs`.
- Prettier settings are in `.prettierrc`

Both TypeScript and JavaScript files are linted and formatted according to these standards.

## Husky Pre-Commit Hooks
Husky runs pre-commit hooks to ensure code quality before each commit:

### Hooks
- Linting with ESLint.
- Formatting with Prettier.

Commits are allowed only if code passes all hook checks, helping prevent issues early.

## Environment Variables
Environment variables are injected into the app based on .env files.

### File Precedence:
`.env.development.local, .env.development, .env.local, and .env` are used in this order, with `.env` having the lowest priority.

### Usage 
Variables are accessible via `process.env` in the code.

**Important**: If you add new environment variables, remember to:
- Update public/injectenv to ensure the variable is correctly injected into the client app.
- Notify the DevOps team of the new variables to ensure they're set up correctly across different environments.

#### .env.example:
```
REACT_APP_BACKEND_API=https://example.com/graphql
REACT_APP_LOGIN_URL=https://example.com/oauth2/authorize
REACT_APP_VERSION=v3.8.7
```

## Material-UI v6 Migration
We are transitioning components and styles to Material-UI (MUI) v6, while some third-party components still rely on MUI v4. This may cause compatibility issues.

### Guidelines for Migration
- Update components to MUI v6 as you work on them.
- Test thoroughly to ensure that updates don’t break existing UI components, especially those relying on MUI v4. Check [troubleshooting section](#troubleshooting-mui-migration-issues)
- Use `adaptV4Theme` for compatibility when needed.

#### Example Using adaptV4Theme to Wrap MUI v4 Components
```
import { ThemeProvider as ThemeProviderV6, createTheme, adaptV4Theme } from "@mui/material/styles";
import { ThemeProvider as ThemeProviderV4, createMuiTheme } from "@material-ui/core/styles";

const themeV6 = createTheme();
const themeV4 = createMuiTheme(adaptV4Theme());

const MyComponent = () => (
  <ThemeProviderV6 theme={themeV6}>
    <ThemeProviderV4 theme={themeV4}>
      {/* MUI v4 and v6 components can coexist here */}
    </ThemeProviderV4>
  </ThemeProviderV6>
);
```
**Note:** adaptV4Theme converts v4 styles to be compatible with v6, but use this carefully to avoid unexpected UI issues.
**IMPORTANT**: After any code change to switch to **MUI v6** components and styles you should:
- Build the code for production with the command `npm run build`.
- Run a prod server with the command `npm run serve`.

### Troubleshooting MUI Migration Issues
1. Broken UI
- Problem: Style conflicts due to clashing styles of v4 and v6 components.
- Solution (check `src/ThemeContext.jsx`):
    - Wrap MUI v6 components in a ThemeProvider using the v6 theme.
    - Wrap MUI v4 components in a ThemeProvider with adaptV4Theme.
    - Wrap all in a `StylesProvider` and pass `generateClassnames` from `src/utils/mui-config.js`.
    - Separate v4 and v6 components into different modules if conflicts persist.


## Additional Resources
- [TypeScript Documentation](https://www.typescriptlang.org/docs/).
- [GraphQL Codegen Documentation](https://the-guild.dev/graphql/codegen/docs/getting-started).
- [ESLint Documentation](https://eslint.org/docs/latest/).
- [Prettier Documentation](https://prettier.io/docs/en/install).
- [Material UI V6](https://mui.com/material-ui/getting-started/).
- [Material UI V4](https://v4.mui.com/getting-started/installation/?_gl=1*1y4yl9b*_ga*MTEzODc5MzkuMTczMDA3NzE3Mw..*_ga_5NXDQLC2ZK*MTczMDA4MDY1Ni4yLjEuMTczMDA4MDY4Mi4zNC4wLjA.).

## Support
Please reach out with any questions or issues to [#icdc-dev](https://expanddatacommons.slack.com/archives/CKGQKEGBB)
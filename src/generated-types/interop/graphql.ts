/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type QueryType = {
  __typename?: 'QueryType';
  storeManifest?: Maybe<Scalars['String']['output']>;
};

export type QueryTypeStoreManifestArgs = {
  manifest: Scalars['String']['input'];
};

export type StoreManifestQueryVariables = Exact<{
  manifest: Scalars['String']['input'];
}>;

export type StoreManifestQuery = {
  __typename?: 'QueryType';
  storeManifest?: string | null;
};

export const StoreManifestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'storeManifest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'manifest' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storeManifest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'manifest' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'manifest' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StoreManifestQuery, StoreManifestQueryVariables>;

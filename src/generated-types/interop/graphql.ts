/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FileInList = {
  association?: InputMaybe<Scalars['String']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  case_id?: InputMaybe<Scalars['String']['input']>;
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  drs_uri?: InputMaybe<Scalars['String']['input']>;
  file_description?: InputMaybe<Scalars['String']['input']>;
  file_format?: InputMaybe<Scalars['String']['input']>;
  file_name?: InputMaybe<Scalars['String']['input']>;
  file_size?: InputMaybe<Scalars['Float']['input']>;
  file_type?: InputMaybe<Scalars['String']['input']>;
  file_uuid?: InputMaybe<Scalars['String']['input']>;
  individual_id?: InputMaybe<Scalars['String']['input']>;
  md5sum?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sample_id?: InputMaybe<Scalars['String']['input']>;
  study_code?: InputMaybe<Scalars['String']['input']>;
};

export type IdcMetadata = {
  __typename?: 'IDCMetadata';
  cancer_type?: Maybe<Scalars['String']['output']>;
  collection_id?: Maybe<Scalars['String']['output']>;
  date_updated?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  doi?: Maybe<Scalars['String']['output']>;
  image_types?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  species?: Maybe<Scalars['String']['output']>;
  subject_count?: Maybe<Scalars['Int']['output']>;
  supporting_data?: Maybe<Scalars['String']['output']>;
};

export type Link = {
  __typename?: 'Link';
  metadata?: Maybe<Metadata>;
  repository?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Metadata = IdcMetadata | TciaMetadata;

export type QueryType = {
  __typename?: 'QueryType';
  storeManifest?: Maybe<Scalars['String']['output']>;
  studiesByProgram?: Maybe<Array<Maybe<StudyOfProgram>>>;
  studyLinks?: Maybe<Array<Maybe<Link>>>;
};


export type QueryTypeStoreManifestArgs = {
  manifest: Scalars['String']['input'];
};


export type QueryTypeStudyLinksArgs = {
  study_code: Scalars['String']['input'];
};

export type StudyOfProgram = {
  __typename?: 'StudyOfProgram';
  CRDCLinks?: Maybe<Array<Maybe<Link>>>;
  clinical_study_designation?: Maybe<Scalars['String']['output']>;
  numberOfCRDCNodes?: Maybe<Scalars['Int']['output']>;
  numberOfImageCollections?: Maybe<Scalars['Int']['output']>;
};

export type TciaMetadata = {
  __typename?: 'TCIAMetadata';
  Aggregate_BodyPartExamined?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  Aggregate_ImageCount?: Maybe<Scalars['Int']['output']>;
  Aggregate_Modality?: Maybe<Scalars['String']['output']>;
  Aggregate_PatientID?: Maybe<Scalars['Int']['output']>;
  Collection?: Maybe<Scalars['String']['output']>;
};

export type StoreManifestQueryVariables = Exact<{
  manifest: Scalars['String']['input'];
}>;


export type StoreManifestQuery = { __typename?: 'QueryType', storeManifest?: string | null };


export const StoreManifestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storeManifest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manifest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storeManifest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"manifest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manifest"}}}]}]}}]} as unknown as DocumentNode<StoreManifestQuery, StoreManifestQueryVariables>;
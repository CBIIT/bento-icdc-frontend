import React from 'react';
import GraphiQL from 'graphiql';
import env from '../../utils/env';
import 'graphiql/graphiql.min.css';
import { styled } from '../../dependencies/material-ui-6';

const BACKEND = env.REACT_APP_BACKEND_API;

function graphQLFetcher(graphQLParams) {
  return fetch(BACKEND, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
}

const OuterLayer = styled('div')({
  height: '1100px',
  marginTop: '0px',
});

const GraphQLView = () => (
  <OuterLayer>
    <GraphiQL fetcher={graphQLFetcher} />
  </OuterLayer>
);

export default GraphQLView;

import React from 'react';
import { withStyles } from '@material-ui/styles';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';

const BACKEND = process.env.REACT_APP_BACKEND_API;

function graphQLFetcher(graphQLParams) {
  return fetch(BACKEND, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

const GraphQLView = ({ classes }) => {
  return (
    <div className={classes.grapqhQlContainer}>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>
  );
};

const styles = () => ({
  grapqhQlContainer: {
    height: '900px',
    marginTop: '0px',
  },
});

export default withStyles(styles)(GraphQLView);

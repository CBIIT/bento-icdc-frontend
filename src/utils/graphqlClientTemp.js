import ApolloClient from 'apollo-boost';
import env from './env';

const BENTO_BACKEND = env.REACT_APP_BENTO_BACKEND_API;

const clientBento = new ApolloClient({
  uri: BENTO_BACKEND,
});

export default clientBento;

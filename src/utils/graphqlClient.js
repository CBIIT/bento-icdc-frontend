import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';

const BACKEND = process.env.REACT_APP_BACKEND_API;
const INTEROP_SERVICE = process.env.REACT_APP_INTEROP_SERVICE_URL;

const backendService = new HttpLink({
  uri: BACKEND,
});

const interopService = new HttpLink({
  uri: INTEROP_SERVICE,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: BACKEND,
  link: ApolloLink.split(
    op => op.getContext().clientName === 'interopService',
    interopService,
    backendService
  ),
});
export default client;

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import './libraries/server'; // This does the magic
import './index.css';
import { AppLocalStorage } from './utils/app-localstorage';
import { BrowserRouter } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AppLocalStorage.getItem('user-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: '/graphql',
  link: authLink.concat(httpLink)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

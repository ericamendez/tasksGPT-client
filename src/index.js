import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('tasks-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  })

  const httpLink = createHttpLink({
    uri: 'https://tasksgpt.onrender.com/graphql',
  });
  // https://tasksgpt.onrender.com/graphql
  //'http://localhost:4001/graphql',

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
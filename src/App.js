import React from "react";import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import {useAuth} from "./context/auth-context";
import {FullPageSpinner} from "./components/lib";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const AuthenticatedApp = React.lazy(() => import(/* webpackPrefetch: true */'./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <ApolloProvider client={client}>
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
    </ApolloProvider>
  )
}

export default App;

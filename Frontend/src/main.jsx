import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client"

import { BrowserRouter } from "react-router-dom"

const link = createHttpLink({
  uri: "https://comp308-403-group-project.onrender.com/graphql",
  credentials: 'include'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)

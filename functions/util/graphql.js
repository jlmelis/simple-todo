//folowwing code from https://github.com/jlengstorf/dynamic-jamstack-examples
import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  fetch,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
      },
    });
  },
});

export async function query(query, variables = {}) {
  const results = await client.query({
    query: query,
    variables: variables,
    fetchPolicy: 'network-only',
  });
  
  return (results.data);
}

export async function mutate(mutation, variables = {}) {
  const results = await client.mutate({ mutation: mutation, variables: variables });
  
  return (results.data);
}
  

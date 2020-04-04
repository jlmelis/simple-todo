import { query } from './util/graphql';
import { gql } from 'apollo-boost';

export async function handler() {
  const { todos } = await query(gql`
    query {
      todos {
        data {
          id: _id
          title
          completed
        }
      }
    }
  `);

  return {
    statusCode: 200,
    body: JSON.stringify(todos.data),
  };
}
import { mutate } from './util/graphql';
import { gql } from 'apollo-boost';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    const { id, title, completed } = JSON.parse(event.body);

    const UPDATE_TODO = gql`
      mutation ($id: ID!, $title:String!, $completed: Boolean) {
        updateTodo(id: $id, data: {
          title: $title
          completed: $completed
        }) {
          title
          completed
        }
      }
    `;

    await mutate(UPDATE_TODO, { id, title, completed });

    return {
      statusCode: 200,
      body: JSON.stringify(''),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
}
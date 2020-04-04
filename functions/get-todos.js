import graphql from './util/graphql';

export async function handler() {
  const { todos } = await graphql(`
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
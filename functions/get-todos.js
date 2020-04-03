const graphql = require('./util/graphql');

exports.handler = async () => {
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
};
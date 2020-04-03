const graphql = require('./util/graphql');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    const { title } = JSON.parse(event.body);

    const ADD_TODO = `
      mutation($title: String!) {
        createTodo(data: {
          title: $title
          completed: false
        }) {
          id: _id
          title
          completed
        }
      }
    `;

    const newTodo = await graphql(ADD_TODO,{ title });

    return {
      statusCode: 201,
      body: JSON.stringify(newTodo.createTodo),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
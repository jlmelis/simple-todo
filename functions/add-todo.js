const graphql = require('./util/graphql');
const querystring = require('querystring');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    const { title } = querystring.parse(event.body);

    const ADD_TODO = `
      mutation($title: String!) {
        createTodo(data: {
          title: $title
          completed: false
        }) {
          title
          completed
        }
      }
    `;

    await graphql(ADD_TODO,{ title });

    return {
      statusCode: 302,
      headers: {
        Location: '/',
      },
      body: 'created...',
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
const grapqhl = require('./util/graphql');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }
    
    const { id } = JSON.parse(event.body);

    const DELETE_TODO = `
      mutation ($id: ID!){
        deleteTodo(id: $id){
          id: _id
        }
      }
    `;

    const deletedId = await grapqhl(DELETE_TODO, { id });

    return {
      statusCode: 200,
      body: JSON.stringify(deletedId.deleteTodo),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
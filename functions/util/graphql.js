//folowwing code from https://github.com/jlengstorf/dynamic-jamstack-examples
const axios = require('axios');

module.exports = async (query, variables = {}) => {
  return axios
    .post(
      'https://graphql.fauna.com/graphql',
      {
        query: query,
        variables,
      },
      {
        headers: {
          authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
        },
      },
    )
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
    });
};
  
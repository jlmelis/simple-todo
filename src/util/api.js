const BASE_URL = '/.netlify/functions/';

async function apiHelper(endpoint, body) {
  const response = await fetch(`/.netlify/functions/${endpoint}`, {
    method: 'post',
    body: body,
  });
  return await response.json();
}

const getAll = async () => {
  const response = await fetch(BASE_URL + 'get-todos');
  return await response.json();
};

const addTodo = async (title) => {
  return await apiHelper('add-todo', JSON.stringify({ title: title }));
};

const deleteTodo = async (id) => {
  const deleted = await apiHelper('delete-todo', JSON.stringify({ id: id }));

  return deleted.id;
};

const updateTodo = async(todo) => {
  await apiHelper('update-todo', JSON.stringify(todo));
};

export default {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
};
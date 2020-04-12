/* Using a store in this app is overkill and most likely
   not an appropriate use of the store. I did it this way
   to prove out some concepts I may/may not use in a future app
*/
import { writable } from 'svelte/store';

async function api(endpoint, body) {
  const res = await fetch(`/.netlify/functions/${endpoint}`, {
    method: 'post',
    body: body,
  });
  return await res.json();
}

function createTodos() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    add: async (title) => {
      const newTodo = await api('add-todo', JSON.stringify({ title: title }));
      update((n) => [...n, newTodo]);
    },
    delete: async (id) => {
      const deleted = await api('delete-todo', JSON.stringify({ id: id }));
      update((n) => n.filter((t) => t.id !== deleted.id));
    },
    update: async (todo) => {
      await api('update-todo', JSON.stringify(todo));
    },
  };
}

export const todos = createTodos();
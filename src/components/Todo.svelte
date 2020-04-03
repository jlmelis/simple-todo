<script>
  export let todo;

  function onDelete(id) {
    deleteTodo(id);
  }

  async function deleteTodo(id){
    await fetch('/.netlify/functions/delete-todo', {
      method: 'post',
      body: JSON.stringify({ id: id }),
    });
  }

  function onUpdate() {
    todo.completed = !todo.completed;
    updateTodo(todo);
  }

  async function updateTodo() {
    await fetch('/.netlify/functions/update-todo', {
      method: 'post',
      body: JSON.stringify(todo),
    });
  }
</script>

{todo.title}
<input type="checkbox" bind:checked={todo.completed} on:click|preventDefault={onUpdate} />
<button on:click={onDelete(todo.id)}>delete</button>
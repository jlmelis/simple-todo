<script>
  import { todos } from '../store';
  export let todo;

  function onDelete() {
    todos.delete(todo.id);
  }

  function onUpdate(event) {
    // manually setting this opposed to two way binding
    // due to syncing issues between the property andd the visual
    todo.completed = event.target.checked;
    todos.update(todo);
  }
</script>

{todo.title}
<input type="checkbox" checked={todo.completed} on:click={onUpdate} />
<button on:click={onDelete}>delete</button>
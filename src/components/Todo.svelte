<script>
  import { todos } from '../store';
  export let todo;
  
  function onDelete() {
    todos.delete(todo.id);
  }

  function onUpdate() {
    todo.completed = !todo.completed;
    todos.update(todo);
  }
</script>

<div class="level is-mobile">
  <div class="level-left">
    <div class="level-item">
      <button class="button" class:is-success={todo.completed} on:click={onUpdate}>
        <i class="iconify" 
            data-icon="icomoon-free:checkmark2" 
            data-inline="false"></i>
      </button> 
    </div>
  </div>
  <div class="level-item">
    <span class:completed={todo.completed}>{todo.title}</span>
  </div>
  <div class="level-right">
    <div class="level-item" >
      <button class="button" on:click={onDelete}>
        <i class="iconify icon-bin" 
          data-icon="icomoon-free:bin" 
          data-inline="false"></i>
      </button>
    </div>
  </div>
</div>

<style>
  .icon-bin {
    color: red;
  }
  .completed {
    text-decoration: line-through;
    color: lightgray
  }
</style>
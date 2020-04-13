<script>
  import { createEventDispatcher } from 'svelte';
  
  export let todo;
  
  const dispatch = createEventDispatcher();

  function onDelete() {
    dispatch('delete', { id: todo.id });
  }

  function onUpdate() {
    todo.completed = !todo.completed;
    dispatch('update', { todo: todo });
  }
</script>

<div class="level is-mobile todo">
  <div class="level-left">
    <div class="level-item">
      <button class="button is-size-5-desktop is-size-7-mobile" 
        class:is-success={todo.completed} on:click={onUpdate}>
        <i class="iconify" 
            data-icon="icomoon-free:checkmark2" 
            data-inline="false"></i>
      </button> 
    </div>
  </div>
  <div class="level-item">
    <span class="todo-title" class:completed={todo.completed}>{todo.title}</span>
  </div>
  <div class="level-right">
    <div class="level-item" >
      <button class="button is-size-5-desktop is-size-7-mobile" on:click={onDelete}>
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
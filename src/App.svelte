<script>
  import { onMount } from 'svelte';
  import Todo from './components/Todo.svelte';
  import { todos } from './store';

  let title = '';

  onMount(async () =>{
    const res = await fetch('/.netlify/functions/get-todos');
    const todosList = await res.json();

    todos.set(todosList);
  });

  function addTodo(event){
    if (event.which === 13){
      todos.add(title);
      title = '';
    }
  }
</script>

<section class="section">
  <div class="container">
    <h1 class="title has-text-centered">Todos</h1>
    <input id="add-todo" class="input is-primary" type="text" 
      placeholder="Add todo"
      name="title" bind:value={title} on:keydown={addTodo} />
    <ul>
      {#each $todos as todo}
        <li>
          <Todo todo={todo} ></Todo>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
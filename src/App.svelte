<script>
  import { onMount } from 'svelte';
  import Todo from './components/Todo.svelte';
  import api from './util/api.js';

  let title = '';
  let todos = [];

  onMount(async () =>{
    todos = await api.getAll();
  });

  async function addTodo(event){
    if (event.which === 13){
      const optimisticTodo = { title: title };

      // optimistic add
      todos = [...todos, optimisticTodo];
      title = '';
      // try to save
      try {
        const newTodo = await api.addTodo(optimisticTodo.title);
        
        // replace optimistic todo with real todo
        todos = todos.map(t => t === optimisticTodo ? newTodo : t);
        console.log(todos);
      } catch (error) {
        // TODO: handle failure for the optimistic todo
        console.log(error);
      }
    }
  }

  async function deleteTodo(event) {
    // optimistically delete
    todos = todos.filter(t => t.id !== event.detail.id);
    try {
      api.deleteTodo(event.detail.id);
    } catch (error) {
      // TODO: handle failures
      console.log(error);
    }
  }

  async function updateTodo(event) {
    api.updateTodo(event.detail.todo);
  }
</script>

<section class="section">
  <div class="container">
    <h1 class="title has-text-centered">Todos</h1>
    <input id="add-todo" class="input is-primary" type="text" 
      placeholder="Add todo"
      name="title" bind:value={title} on:keydown={addTodo} />
    <ul>
      {#each todos as todo}
        <li>
          <Todo todo={todo} on:delete={deleteTodo} on:update={updateTodo} ></Todo>
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
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

  function addTodo(){
    todos.add(title);
  }
</script>

<main>
  <form>
    <label for="title">Todo title</label>
    <input type="text" name="title" bind:value={title} />
    <button type="submit" on:click|preventDefault={addTodo}>save</button>
  </form>

  <ul>
    {#each $todos as todo}
      <li>
        <Todo todo={todo} ></Todo>
      </li>
    {/each}
  </ul>
</main>

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
<script>
  import { onMount } from 'svelte';
  import Todo from './components/Todo.svelte';
  let todos =[];

  onMount(async () => {
    const res = await fetch('/.netlify/functions/get-todos');
    todos = await res.json();
  });

  
</script>

<main>
  <form action="/.netlify/functions/add-todo" method="POST">
    <label for="title">Todo title</label>
    <input type="text" name="title" required />
    <button type="submit">save</button>
  </form>

  <ul>
    {#each todos as todo}
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
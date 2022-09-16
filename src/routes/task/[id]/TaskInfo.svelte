<script>
	export let category;
	export let cost;
	export let description;
	export let title;

  function goBack() {
    history.back();
  }
</script>

<section class="task-info">
	<h1>{title}</h1>
	<h2 class="category-cost">
		{category} / <span class="cost">{cost}</span>
	</h2>
	<p class="description">{@html description}</p>

	<form>
		<input type="text" placeholder="flag&#123;Ucucucuga&#125;" />
		<button type="submit">Сдать</button>
	</form>

	<!-- svelte-ignore a11y-missing-attribute -->
	<span class="go-back"><a on:click|preventDefault={goBack}>Вернуться обратно</a></span>
</section>

<style>
	.task-info {
		width: 300px;
	}

	h1 {
		font-size: 2.2rem;
		margin-bottom: 0;
	}
	.category-cost {
		margin: 0;
		line-height: 2;
		text-align: center;
	}
	.category-cost .cost {
		font-family: var(--font-mono);
	}

	.description {
		font-size: 1.2em;
		text-align: center;
		margin: 2em 0;
	}

	form {
		width: 100%;
	}
	form input {
		margin-bottom: 1em;
		padding: 0.8em 0.6em;
		width: calc(100% - 1.2em - 4px);
		border: 2px var(--surface) solid;
		border-radius: 0.4em;
		color: var(--text);
		background-color: transparent;
		outline: none;
	}
	form input::placeholder {
		color: var(--surface);
	}
	form input:focus {
		transition-duration: 200ms;
		color: var(--text-accent);
		border-color: var(--primary);
	}
	form button {
		width: 100%;
		margin: 0;
		padding: 0;
		background-color: var(--surface);
		color: var(--text);
		outline: none;
		border: none;
		border-radius: 0.4em;
		padding: 0.8em 0.6em;
	}
	form button:hover {
		transition-duration: 200ms;
		color: var(--background);
		background-color: var(--primary);
		cursor: pointer;
	}

	.go-back {
    display: block;
    margin-top: 1em;
    text-align: center;
  }
  .go-back a:hover {
    cursor: pointer;
  }

	@media (min-width: 768px) {
		.task-info {
			width: 480px;
		}
		h1 {
			font-size: 3rem;
		}
	}
</style>

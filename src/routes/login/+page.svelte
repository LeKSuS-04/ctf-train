<script>
	const fields = [
		{
			id: 'login',
			placeholder: 'admin',
			label: 'Юзернейм',
			type: 'text'
		},
		{
			id: 'password',
			placeholder: 'wearen0tn00bs',
			label: 'Пароль',
			type: 'password'
		}
	];
</script>

<section>
	<h1>Логин</h1>
	<form>
		{#each fields as field}
			<section>
				<label for={field.id}>{field.label}</label>
				<input id={field.id} type={field.type} placeholder={field.placeholder} />
			</section>
		{/each}
    <button type="submit">Войти</button>
	</form>
</section>

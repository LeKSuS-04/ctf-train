<script>
	const fields = [
		{
			id: 'login',
			placeholder: 'admin',
			label: 'Юзернейм',
			type: 'text'
		},
		{
			id: 'fio',
			placeholder: 'Иванов Иван Иванович',
			label: 'ФИО',
			type: 'text'
		},
		{
			id: 'password',
			placeholder: 'wearen0tn00bs',
			label: 'Пароль',
			type: 'password'
		},
		{
			id: 'confirm_password',
			placeholder: 'andw3canpr00ve1t',
			label: 'Подтвердите пароль',
			type: 'password'
		}
	];
</script>

<section>
	<h1>Регистрация</h1>
	<form>
		{#each fields as field}
			<section>
				<label for={field.id}>{field.label}</label>
				<input id={field.id} type={field.type} placeholder={field.placeholder} />
			</section>
		{/each}
    <button type="submit">Регистрируй меня полностью</button>
	</form>
</section>

<script>
  import { enhance, applyAction } from "$app/forms";
  import { user } from "$lib/userStore";

  export let form;

  const fields = [
    {
      id: "username",
      placeholder: "admin",
      label: "Юзернейм",
      type: "text",
      autocomplete: "username"
    },
    {
      id: "password",
      placeholder: "wearen0tn00bs",
      label: "Пароль",
      type: "password",
      autocomplete: "current-password"
    }
  ];

  function login() {
    return async ({ result }) => {
      await applyAction(result);
      if (result.type === "success") {
        await user.login(result.data);
      }
    };
  }
</script>

<section>
  <h1>Логин</h1>
  <form method="POST" use:enhance={login}>
    {#each fields as field}
      <section>
        <label for={field.id}>{field.label}</label>
        <input {...field} name={field.id} value={form ? form[field.id] ?? "" : ""} />
      </section>
    {/each}

    {#if form}
      {#if form.missing}
        <span class="error">Необходимо заполнить все поля</span>
      {:else if form.badCredentials}
        <span class="error">Не удалось найти пользователя с такими учетными данными</span>
      {/if}
    {/if}

    <button type="submit">Войти</button>
  </form>
</section>

<style>
  section {
    max-width: 425px;
    width: 100%;
  }
</style>

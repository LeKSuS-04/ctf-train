<script>
  import FormError from "$lib/components/FormError.svelte";
  import { enhance, applyAction } from "$app/forms";
  import { user } from "$lib/stores/userStore";

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
      id: "fio",
      placeholder: "Иванов Иван Иванович",
      label: "ФИО",
      type: "text",
      autocomplete: "name"
    },
    {
      id: "password",
      placeholder: "wearen0tn00bs",
      label: "Пароль",
      type: "password",
      autocomplete: "new-password"
    },
    {
      id: "confirm_password",
      placeholder: "andw3canpr00ve1t",
      label: "Подтвердите пароль",
      type: "password",
      autocomplete: "new-password"
    }
  ];

  function register({ data, cancel }) {
    const password = data.get("password");
    const confirmPassword = data.get("confirm_password");
    if (password !== confirmPassword) {
      // HACK: At first submition, form won't be initialized
      // with data from previous requests
      if (form === null) form = {};

      form.passwordsDontMatch = true;
      cancel();
    }

    return async ({ result }) => {
      if (result.type === "success") {
        await user.login(result.data);
      } else {
        applyAction(result);
      }
    };
  }
</script>

<section>
  <h1>Регистрация</h1>
  <form method="POST" use:enhance={register}>
    {#each fields as field (field.id)}
      <section>
        <label for={field.id}>{field.label}</label>
        <input {...field} name={field.id} value={form ? form[field.id] ?? "" : ""} />
      </section>
    {/each}

    {#if form}
      {#if form.passwordsDontMatch}
        <FormError>Указанные пароли не совпадают</FormError>
      {:else if form.missing}
        <FormError>Необходимо заполнить все поля</FormError>
      {:else if form.exists}
        <FormError>Пользователь с таким именем уже зарегистрирован</FormError>
      {/if}
    {/if}

    <button type="submit">Регистрируй меня полностью</button>
  </form>
</section>

<style>
  section {
    max-width: 425px;
    width: 100%;
  }
</style>

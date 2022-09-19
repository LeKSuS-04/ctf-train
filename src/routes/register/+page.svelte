<script>
  import { enhance } from "$app/forms";

  export let form;

  const fields = [
    {
      id: "username",
      placeholder: "admin",
      label: "Юзернейм",
      type: "text"
    },
    {
      id: "fio",
      placeholder: "Иванов Иван Иванович",
      label: "ФИО",
      type: "text"
    },
    {
      id: "password",
      placeholder: "wearen0tn00bs",
      label: "Пароль",
      type: "password"
    },
    {
      id: "confirm_password",
      placeholder: "andw3canpr00ve1t",
      label: "Подтвердите пароль",
      type: "password"
    }
  ];
</script>

<section>
  <h1>Регистрация</h1>
  <form method="POST" use:enhance>
    {#each fields as field}
      <section>
        <label for={field.id}>{field.label}</label>
        <input {...field} name={field.id} value={form ? form[field.id] ?? "" : ""} />
      </section>
    {/each}

    {#if form}
      {#if form.missing}
        <span class="error">Необходимо заполнить все поля</span>
      {:else if form.exists}
        <span class="error">Пользователь с таким именем уже зарегистрирован</span>
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

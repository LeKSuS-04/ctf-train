import { error } from "@sveltejs/kit";

export function load({ params }) {
  if (params.id == 24) return {
    title: 'Not aes',
    category: 'Crypto',
    cost: 1000,
    description: 'John\'s special: link heres',
    solvers: [
      {id: 0, login: 'silent', fio: 'Першин Максим', time: '2017-11-01 17:35:07'},
      {id: 1, login: 'Raneddo', fio: 'Липатов Роман Викторович', time: '2017-11-09 22:02:25'},
      {id: 2, login: 'keker', fio: 'kek', time: '2017-11-17 18:48:57'},
      {id: 3, login: 'Artgas', fio: 'Гаспарян Артём Гайкович', time: '2018-08-08 20:03:19'},
      {id: 4, login: 'senior', fio: 'веселов', time: '2018-12-22 18:20:55'},
      {id: 5, login: 'BadWolf', fio: 'Краснопольский Иван Денисович', time: '2019-09-28 20:21:36'},
      {id: 6, login: 'defolt17', fio: 'Илья Дес. Ф.', time: '2020-03-02 17:54:14'},
      {id: 7, login: 'LeKSuS', fio: 'Тарасов Алексей Валерьевич', time: '2021-06-21 16:21:10'},
      {id: 8, login: 'liza', fio: 'Авдеева Елизавета', time: '2022-01-30 21:46:21'},
      {id: 9, login: 'Mihafil746', fio: 'Фильчуков Михаил Денисович', time: '2022-03-03 21:30:35'},
    ]
  };
  if (params.id == 5) return {
    title: 'Baby Brute #2',
    category: 'Web',
    cost: 150,
    description: 'сервер https://link.here  Зайдите за админа. Пароль состоит из 5 символов из набора \'pwd\', каждый символ может встречаться любое количество раз.',
    solvers: [
      {id: 0, login: 'silent', fio: 'Першин Максим', time: '2017-11-01 17:35:07'},
      {id: 1, login: 'Raneddo', fio: 'Липатов Роман Викторович', time: '2017-11-09 22:02:25'},
      {id: 2, login: 'keker', fio: 'kek', time: '2017-11-17 18:48:57'},
      {id: 3, login: 'Artgas', fio: 'Гаспарян Артём Гайкович', time: '2018-08-08 20:03:19'},
      {id: 4, login: 'Орден Обратного Слеша', fio: 'веселов', time: '2018-12-22 18:20:55'},
      {id: 5, login: 'dmi\'; DROP database db;--', fio: 'Краснопольский Иван Денисович', time: '2019-09-28 20:21:36'},
      {id: 6, login: 'defolt17', fio: 'Илья Дес. Ф.', time: '2020-03-02 17:54:14'},
      {id: 7, login: 'LeKSuS', fio: 'Тарасов Алексей Валерьевич', time: '2021-06-21 16:21:10'},
      {id: 8, login: 'liza', fio: 'Авдеева Елизавета', time: '2022-01-30 21:46:21'},
      {id: 9, login: 'Mihafil746', fio: 'Фильчуков Михаил Денисович', time: '2022-03-03 21:30:35'},
    ]
  }

  throw error(404);
}
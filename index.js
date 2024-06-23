const initState = {
  users: [],
  userId: null,
  todos: {},
};

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      console.log(users);
      initState.users = users;
      const usersId = users.map(({ id }) => id);
      usersId.forEach((id) => initState.todos[id] = []);
      updateUI();
    })
    .catch(error => console.error('Ошибка:', error));
}

function updateUI() {
  const main = document.querySelector('.main');
  const ol = document.createElement('ol');
  ol.classList.add('ol');

  initState.users.forEach((user) => {
    const li = document.createElement('li');
    li.classList.add('li');

    const btn = document.createElement('button');
    btn.classList.add('button');

    btn.textContent = `name: ${user.name}, username: ${user.username}, email: ${user.email}`;
    btn.addEventListener('click', function() {
      showUserProfile(user);
    });

    li.append(btn);
    ol.append(li);
  });
  main.append(ol);
}

document.addEventListener('DOMContentLoaded', fetchUsers);

function clearMainContent() {
  const main = document.querySelector('.main');
  main.innerHTML = '';
}

function showUserProfile(user) {
  clearMainContent();

  const profileContainer = document.createElement('div');
  profileContainer.classList.add('profile');
  profileContainer.innerHTML = `
    <div class="profile__title">
      <img src="./public/user.png" alt="Аватар пользователя" />
      <h1>${user.name}</h1>
    </div>
    <div class="profile__info">
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Телефон: ${user.phone}</p>
    </div>
  `;

  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo');
  todoContainer.innerHTML = `
  <form class="todo__form">
    <input type="text" name="task" class="todo__input" placeholder="Добавить задачу...">
    <button type="submit" class="todo__button">Добавить</button>
  </form>
  <ul class="todo__list"></ul>
  `;

  const main = document.querySelector('.main');
  main.append(profileContainer, todoContainer);

  document.querySelector('.todo__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = formData.get('task').trim();
    if (task) {
      initState.todos[user.id].push({ name: task, completed: false });
      updateTodoUI(user);
    } else {
      alert('Задача не может быть пустой');
    }
  });
}

document.querySelector('.header__link').addEventListener('click', function() {
  clearMainContent();
  updateUI();
});

function updateTodoUI(user) {
  const ul = document.querySelector('.todo__list');
  ul.innerHTML = '';

  initState.todos[user.id].forEach(({ name, completed }, index) => {
    const li = document.createElement('li');
    li.classList.add('todo__li');

    const taskText = document.createElement('span');
    taskText.textContent = name;
    const div = document.createElement('div');
    div.classList.add('todo__buttons');
    const btnClose = document.createElement('button');
    const btnDel = document.createElement('button');
    if (completed) {
      taskText.classList.add('todo__li--completed');
      btnClose.disabled = true;
      btnClose.classList.add('disable');
    }
    btnClose.textContent = 'Завершить';
    btnDel.textContent = 'Удалить';

    div.append(btnClose, btnDel);
    li.append(taskText, div);
    ul.append(li);

    btnClose.addEventListener('click', function() {
      initState.todos[user.id][index].completed = true;
      taskText.classList.add('todo__li--completed');
      btnClose.disabled = true;
      btnClose.classList.add('disable');
    });

    btnDel.addEventListener('click', function() {
      initState.todos[user.id].splice(index, 1);
      li.remove();
    });
  });
}
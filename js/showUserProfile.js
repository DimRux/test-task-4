import clearMainContent from "./clearMainContent.js";
import updateTodoUI from "./updateTodoUI.js";

function showUserProfile(user, initState) {
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
      updateTodoUI(user, initState);
    } else {
      alert('Задача не может быть пустой');
    }
  });
}

export default showUserProfile;

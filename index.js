import clearMainContent from "./js/clearMainContent.js";
import updateUI from "./js/udpateUI.js";

const initState = {
  users: [],
  userId: null,
  todos: {},
};

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      initState.users = users;
      const usersId = users.map(({ id }) => id);
      usersId.forEach((id) => initState.todos[id] = []);
      updateUI(initState);
    })
    .catch(error => console.error('Ошибка:', error));
}

document.addEventListener('DOMContentLoaded', fetchUsers);

document.querySelector('.header__link').addEventListener('click', function () {
  clearMainContent();
  updateUI(initState);
});

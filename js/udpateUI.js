import showUserProfile from "./showUserProfile.js";
import updateTodoUI from "./updateTodoUI.js";

function updateUI(initState) {
  const main = document.querySelector('.main');
  const ol = document.createElement('ol');
  ol.classList.add('ol');

  initState.users.forEach((user) => {
    const li = document.createElement('li');
    li.classList.add('li');

    const btn = document.createElement('button');
    btn.classList.add('button');

    btn.textContent = `name: ${user.name}, username: ${user.username}, email: ${user.email}`;
    btn.addEventListener('click', function () {
      showUserProfile(user, initState);
      updateTodoUI(user, initState);
    });

    li.append(btn);
    ol.append(li);
  });
  main.append(ol);
}

export default updateUI;

function updateTodoUI(user, initState) {
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

    btnClose.addEventListener('click', function () {
      initState.todos[user.id][index].completed = true;
      taskText.classList.add('todo__li--completed');
      btnClose.disabled = true;
      btnClose.classList.add('disable');
    });

    btnDel.addEventListener('click', function () {
      initState.todos[user.id].splice(index, 1);
      li.remove();
    });
  });
}

export default updateTodoUI;

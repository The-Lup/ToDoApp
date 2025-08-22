// src/use-cases/create-todo-html.js
import { todoStore } from '../store/todo.store.js';

/**
 * Create a <li> element representing a todo
 * @param {Todo} todo - Todo object
 * @returns {HTMLElement}
 */
export const createTodoHTML = (todo) => {
  const { id, description, done } = todo;

  const li = document.createElement('li');
  li.className = todo.done ? 'completed' : '';
  li.setAttribute('data-id', id);

  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
      <label>${description}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${description}">
  `;

  // Toggle done
  li.querySelector('.toggle').addEventListener('change', () => {
    todoStore.toggleTodo(id);
    document.querySelector('.todo-list').dispatchEvent(new Event('update'));
  });

  // Delete todo
  li.querySelector('.destroy').addEventListener('click', () => {
    todoStore.deleteTodo(id);
    document.querySelector('.todo-list').dispatchEvent(new Event('update'));
  });

  return li;
};

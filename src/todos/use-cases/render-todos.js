import { todoStore } from '../../store/todo.store.js';

let listElement;

/**
 * Render the list of todos
 * @param {string} selector - CSS selector of the UL container to render todos
 */
export const renderTodos = (selector) => {
  if (!listElement) listElement = document.querySelector(selector);
  if (!listElement) throw new Error(`Element ${selector} not found`);

  const todos = todoStore.getTodos();

  // Clear the list before rendering
  listElement.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'completed' : '';

    // Checkbox to toggle individual todo
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todoStore.toggleTodo(todo.id);
      renderTodos(selector); // re-render
    });

    // Todo text
    const span = document.createElement('span');
    span.innerText = todo.description;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '✕';
    deleteBtn.className = 'destroy';
    deleteBtn.addEventListener('click', () => {
      todoStore.deleteTodo(todo.id);
      renderTodos(selector);
    });

    // Assemble li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    listElement.appendChild(li);
  });
};

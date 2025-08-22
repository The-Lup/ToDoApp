// src/app/component.app.js
import appTemplate from '../todos/component.app.html?raw'; // Import HTML template as string
import { renderTodos } from '../todos/use-cases/render-todos.js';
import { renderPending } from '../todos/use-cases/render-pending.js';
import { todoStore } from '../store/todo.store.js';

export class App {
  constructor(rootElementId) {
    this.root = document.getElementById(rootElementId);
  }

  init() {
    // Load template into root
    this.root.innerHTML = appTemplate;

    // Initialize store
    todoStore.initStore();

    // Initial render
    this.refreshUI();

    // Event listeners
    this.addEventListeners();
  }

  refreshUI() {
    renderTodos('.todo-list');
    renderPending('#pending-count');
  }

  addEventListeners() {
    // Add new todo
    const input = document.querySelector('#new-todo-input');
    input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && event.target.value.trim().length > 0) {
        todoStore.addTodo(event.target.value);
        event.target.value = '';
        this.refreshUI();
      }
    });

    // Toggle all
    const toggleAll = document.querySelector('#toggle-all');
    toggleAll.addEventListener('change', () => {
      todoStore.toggleAll(toggleAll.checked);
      this.refreshUI();
    });

    // Clear completed
    const clearBtn = document.querySelector('.clear-completed');
    clearBtn.addEventListener('click', () => {
      todoStore.clearCompleted();
      this.refreshUI();
    });

    // Filters (All, Active, Completed)
    document.querySelectorAll('.filters a').forEach((filter) => {
      filter.addEventListener('click', (event) => {
        event.preventDefault();
        document
          .querySelectorAll('.filters a')
          .forEach((f) => f.classList.remove('selected'));
        filter.classList.add('selected');

        const filterType = filter.getAttribute('href').replace('#/', '');
        todoStore.setFilter(filterType);
        this.refreshUI();
      });
    });
  }
}

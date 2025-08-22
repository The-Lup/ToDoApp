import { todoStore } from '../../store/todo.store.js';

let element;

/**
 * Render the pending todos count
 * @param {string} elementId - CSS selector for the pending counter
 */
export const renderPending = (elementId) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error(`Element ${elementId} not found`);

  element.innerText = todoStore.getPendingCount();
};

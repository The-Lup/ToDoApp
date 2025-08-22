export const todoStore = {
  todos: [], // Array of todos
  filter: 'all', // Current filter: 'all' | 'active' | 'completed'

  /**
   * Initialize the store
   * Can be extended to load from localStorage
   */
  initStore() {
    this.todos = [];
    this.filter = 'all';
  },

  /**
   * Add a new todo
   * @param {string} description - Text of the todo
   */
  addTodo(description) {
    this.todos.push({
      id: Date.now(),
      description,
      done: false,
    });
  },

  /**
   * Toggle the completed status of all todos
   * @param {boolean} checked - true to mark all as done, false to mark all as active
   */
  toggleAll(checked) {
    this.todos.forEach((todo) => (todo.done = checked));
  },

  /**
   * Remove all completed todos
   */
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.done);
  },

  /**
   * Set the current filter
   * @param {string} filter - 'all' | 'active' | 'completed'
   */
  setFilter(filter) {
    this.filter = filter;
  },

  /**
   * Get todos based on the current filter
   * @returns {Array} Array of filtered todos
   */
  getTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.done);
      case 'completed':
        return this.todos.filter((todo) => todo.done);
      default:
        return this.todos;
    }
  },

  /**
   * Get the count of pending (not done) todos
   * @returns {number} Number of pending todos
   */
  getPendingCount() {
    return this.todos.filter((todo) => !todo.done).length;
  },

  /**
   * Toggle the completed status of a todo by ID
   * @param {number} id - ID of the todo
   */
  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
  },

  /**
   * Delete a todo by ID
   * @param {number} id - ID of the todo
   */
  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  },
};

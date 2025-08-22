// src/models/todo.model.js
export class Todo {
  constructor(description) {
    this.id = crypto.randomUUID();
    this.description = description;
    this.done = false;
  }
}

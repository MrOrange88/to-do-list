const fs = require('fs');
const path = require('path');

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {Date} created
 * @property {Date} updated
 * @property {Date} [finished]
 *
 * @typedef {Object} AllTodosFilter
 * @property {boolean} onlyFinished
 * @property {boolean} onlyNonFinished
 */

const pathTofile = path.join(__dirname, 'todos.json');
/**
 * @type {Todo[]}
 */
let todos = [];
let todoindex = todos.length;
/**
 *
 * @param {AllTodosFilter} filter
 * @returns {Todo[]}
 */
function allTodos(filter) {
  if (!filter) return todos;
  return todos
    .filter((t) => !filter.onlyFinished || t.finished)
    .filter((t) => !filter.onlyNonFinished || !t.finished);
}
function writeTodos() {
  const data = { todos, todoindex };
  const json = JSON.stringify(data, null, 4);
  fs.writeFileSync(pathTofile, json);
}

function readTodos() {
  const data = fs.readFileSync(pathTofile);
  const parsedData = JSON.parse(data);
  todos = parsedData.todos;
  todoindex = parsedData.todoindex;
}
const predicate = (id) => (value) => value.id === id;

/**
 * @param {number} id id of todo element
 */
function oneTodo(id) {
  return todos.find(predicate(id));
}
/**
 *
 * @param {string} title
 * @param {string} [description]
 * @returns {Todo}
 */
function createTodo(title, description = '') {
  todoindex += 1;
  const now = Date.now();
  const todo = {
    id: todoindex,
    title,
    description: description,
    created: now,
    updated: now,
    finished: 0,
  };
  todos.push(todo);
  writeTodos();
  return todo;
}
/**
 *
 * @param {number} id
 * @param {string} [title]
 * @param {string} [description]
 * @param {number | string} [finished]
 */
function updateTodo(id, title, description, finished) {
  //eintrag über id finden
  const todo = oneTodo(id); //Zuweisung
  if (!todo) return; // Das ! ist eine Verneinung(not)

  //eintrag title bearbeiten
  if (title) todo.title = title; // Zuweisung
  if (description) todo.description = description;
  if (finished && !isNaN(Number(finished))) todo.finished = Number(finished);

  if (title || description || finished) {
    todo.updated = Date.now();
    writeTodos();
  }

  return todo;
}
function deleteTodo(id) {
  const index = todos.findIndex(predicate(id));
  if (index < 0) return;
  todos.splice(index, 1);
  writeTodos();
}

module.exports = {
  allTodos,
  oneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  init: function () {
    readTodos();
  },
};

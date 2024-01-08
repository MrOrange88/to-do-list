const express = require('express');
const bodyparser = require('body-parser');
const todo = require('./todo');
const { jsonOrRender } = require('./middlewares');

todo.init();

// setup and configure express app
const app = express();
app.set('x-powered-by', false);
app.set('view engine', 'ejs');
app.set('port', Number(process.env.PORT || 3000));
app.set('hostname', process.env.IP);
app.set(
  'domain',
  `http://${app.get('hostname') || 'localhost'}:${app.get('port')}`
);

// setup middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public', { index: false }));
app.use(jsonOrRender);

// root path
app.get('/', (req, res) => {
  res.redirect('/todos');
});

// todos resource
app.get('/todos', (req, res) => {
  const filter = {
    onlyFinished: Object.hasOwn(req.query, 'only-finished'),
    onlyNonFinished: Object.hasOwn(req.query, 'only-non-finished'),
  };

  res.jsonOrRender('todos', { todos: todo.allTodos(filter) });
});
app.get('/todos/:todoId', (req, res) => {
  res.jsonOrRender('todo/show', req.todo);
});
app.post('/todos', (req, res) => {
  if (!req.body.title) return res.sendStatus(400);

  const result = todo.createTodo(req.body.title, req.body.description);
  res.jsonOrRender('todo/show', result);
});
app.put('/todos/:todoId', (req, res) => {
  const result = todo.updateTodo(
    Number(req.params.todoId),
    req.body.title,
    req.body.description,
    req.body.finished
  );
  if (!result) return res.status(404).send('kein todo für todoId gefunden');

  res.jsonOrRender('todo/show', result);
});
app.delete('/todos/:todoId', (req, res) => {
  todo.deleteTodo(req.todo.id);
  res.sendStatus(204);
});
app.param('todoId', (req, res, next, id) => {
  const todoId = Number(id);
  const result = todo.oneTodo(todoId);
  if (!result) return res.status(404).send('kein todo für todoId gefunden');
  req.todo = result;
  next();
});

app.listen(app.get('port'), app.get('hostname'), () =>
  console.log(`running at ${app.get('domain')}`)
);

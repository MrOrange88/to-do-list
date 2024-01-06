const express = require('express');
const bodyparser = require('body-parser');
const todo = require('./todo');
todo.init();

const app = express();
app.use(bodyparser.json());
app.get('/todos', (req, res) => {
    const filter = {
        onlyFinished: Object.hasOwn(req.query, 'only-finished'),
        onlyNonFinished: Object.hasOwn(req.query, 'only-non-finished')
    }
    res.json(todo.allTodos(filter));
});
app.get('/todos/:todoId', (req, res) => {
    res.json(req.todo);
});
app.post('/todos', (req, res) => {
    if (!req.body.title) return res.sendStatus(400)

    const result = todo.createTodo(req.body.title)
    res.json(result)
});
app.put('/todos/:todoId', (req, res) => {
    if (!req.body.title) return res.sendStatus(400)

    const result = todo.updateTodo(Number(req.params.todoId), req.body.title)
    if (!result) return res.status(404).send('kein todo für todoId gefunden')

    res.json(result);
});
app.delete('/todos/:todoId', (req, res) => {
    todo.deleteTodo(req.todo.id)
    res.sendStatus(204);

});
app.param('todoId', (req, res, next, id) => {
    const todoId = Number(id)
    const result = todo.oneTodo(todoId)
    if (!result) return res.status(404).send('kein todo für todoId gefunden')
    req.todo = result
    next()
})
app.listen(3000, () => console.log('server läuft auf port 3000'));


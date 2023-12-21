const express = require('express');
const app = express();

app.get('/todos', (req, res) => {
    res.sendStatus(503);
});
app.get('/todos/:todoId', (req, res) => {
    res.sendStatus(503);
});
app.post('/todos', (req, res) => {
    res.sendStatus(503);
});
app.put('/todos/:todoId', (req, res) => {
    res.sendStatus(503);
});
app.delete('/todos/:todoId', (req, res) => {
    res.sendStatus(503);
});
app.listen(3000, () => console.log('server läuft auf port 3000'));


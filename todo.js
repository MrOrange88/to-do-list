const todos = [
    {
        id: 1,
        title: "äpfel kaufen"
    },
    {
        id: 2,
        title: "Bannanen kaufen"
    },
    {
        id: 3,
        title: "buch kaufen"
    },
    {
        id: 4,
        title: "fahrrad fahren"
    }
];

function allTodos() {
    return todos;
}
const predicate = id => value => value.id === id
//function suchpredicate(id){
//return function predicate(value){
//   return value.id === id
//}}
/**
 * @param {number} id id of todo element
 */
function oneTodo(id) {
    return todos.find(predicate(id));
}
/**
 * 
 * @param {string} title 
 */
function createTodo(title) {
    const todo = { id: todos.length + 1, title }
    todos.push(todo)
    return todo;
}
/**
 * 
 * @param {number} id 
 * @param {string} title 
 */
function updateTodo(id, title) {
    //eintrag über id finden
    const todo = oneTodo(id); //Zuweisung
    if (!todo) return;       // Das ! ist eine Verneinung(not)

    //eintrag title bearbeiten
    todo.title = title // Zuweisung 
    return todo


}
function deleteTodo(id) {
    const index = todos.findIndex(predicate(id));
    if (index < 0)
        return;
    todos.splice(index, 1)

}

module.exports = {
    allTodos,
    oneTodo,
    createTodo,
    updateTodo,
    deleteTodo

}
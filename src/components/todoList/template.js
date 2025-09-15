import './style.css'

export default function (todoList){
    return `
        <h1>Ma todolist</h1>
        <ul class="todolist">
            ${todoList.todos.map(todo => todo.render()).join("")}
        </ul>`;
}
import './style.css';
import TodoList from './components/todoList/TodoList';

window.todoList=new TodoList({
    elt:"#app",
    apiUrl:'https://689c7d8558a27b18087e649a.mockapi.io/'
})



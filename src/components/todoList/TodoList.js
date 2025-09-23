import getTemplate from './template';
import Todo from '../todo/Todo';
import DB from '../../DB';

export default class TodoList{
    constructor(data){
        this.domElt=document.querySelector(data.elt);
        this.newTodo=null;
        DB.setApiUrl(data.apiUrl);
        this.todos=[];
        this.loadTodos();
    }
    async loadTodos(){
        // Je met dans this.todos des objets de type Todo
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }
    render() {
        this.domElt.innerHTML=getTemplate(this);
    }

    getItemsLeftCount(){
        return this.todos.filter((todo) => todo.completed===false).length;
    }

    //Ajouter dans le this.todo
    addItemInTodos (data){
        this.newTodo=new Todo(data);
        this.todos.push(this.newTodo);
    }

    addItemInDom(){
        //Ajouter son render dans le DOM
        const todoListElt = this.domElt.querySelector('[role="todo-list"]');
        const newLi= document.createElement('div');
        todoListElt.append(newLi);
        newLi.outerHTML=this.newTodo.render();
    }

    renderItemsLeftCount(){
        //Ajuster le nombre d'items restants
        const itemsLeftDomElt = (this.domElt.querySelector('[role=todo-count] span').innerText=this.getItemsLeftCount());
    }

    async deleteOneById(id){
        //Je supprime de la DB
        const resp = await DB.deleteOneById(id);
        console.log(resp);
        if (resp.ok){
        //Je supprime des todos
        this.deleteOneByIdFromTodos(id);
        //Je suppirme du DOM
        this.deleteOneByIdFromDOM(id);
        //Re render le renderItemsLeftCount()
        this.renderItemsLeftCount();
        } 
        
    }

    deleteOneByIdFromTodos(id){
        const index = this.todos.findIndex((todo)=>todo.id===id)
        this.todos.splice(index,1);
    }
    
    deleteOneByIdFromDOM(id){
        this.domElt.querySelector("[data-id='"+id+"']").remove();
    }

    async addTodo(input){
        //Ajouté dans la DB distante
        const todo = await DB.create(input.value);

        this.addItemInTodos(todo);
        this.addItemInDom();
        this.renderItemsLeftCount();
        
        //Je vide l'input
        input.value="";
    }

    async toggleCompletedOneById(id){

        const todo = this.todos.find(todo => todo.id==id);
        todo.completed = !todo.completed;
        //Je modifie la DB
        const resp = await DB.updateOne(todo);
        //Je modifie le DOM
        this.domElt.querySelector("[data-id='"+id+"']").classList.toggle("completed");
        //rerender de l'itemleftcount
        this.renderItemsLeftCount();
    }

}
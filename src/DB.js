export default class DB{
    static setApiUrl(data2){
        this.apiUrl = data2;
    }
     static async findAll(){
        const response = await fetch(this.apiUrl + "todos");
        return response.json();
    }
    static async create(data){
        console.log(data);
        const response = await fetch(this.apiUrl + "todos",{
            method:'POST',
             headers:{"Content-type": "application/json"},
             body: JSON.stringify({
                content: data,
                completed: false
            }),
        });
        return response.json();
    }
    static async deleteOneById(id){
        const response = await fetch(this.apiUrl + "todos/"+id,{
            method:'DELETE',
            })
        return response;
    }
    static async updateOne(todo){
        const response = await fetch(this.apiUrl + "todos/"+todo.id,{
            method:'PUT',
             headers:{"Content-type": "application/json"},
             body: JSON.stringify({
                content: todo.content,
                completed: todo.completed
            }),
        });
        return response.json();
    }
}
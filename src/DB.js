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
}
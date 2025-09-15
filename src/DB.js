export default class DB{
    static setApiUrl(data2){
        this.apiUrl = data2;
    }
     static async findAll(){
        const response = await fetch(this.apiUrl + "todos");
        return response.json();
    }
}
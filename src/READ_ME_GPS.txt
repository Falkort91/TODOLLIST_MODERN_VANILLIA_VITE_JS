ETAPES :

1. Structure général : 3 classes et 2 fonctions
    CLASSES :   - DB
                - TodoList
                - Todo
    FONCTION :  - getTodoTemplate()
                - getTodoListTemplate()
                
2. Instancier une TodoList en lui envoyant l'#app et l'URL de l'API

3. DB : static
        - setApiURL()
        - async findAll()
            ->fetch vers l'API et retourne la réponse en json()

4.TodoList
    - constructeur
        - domElt
        - todos 
        - on doit lancer le setApiURL avec l'url 
        - lance le loadTodos() 
        - lance le render() 
    - async loadTodos qui met des Todo dans todos 
    - render() qui met le template dans le innerHTML dans le domElt

5. Todo
    - constructeur
        - id
        - content
        - completed
        - created_at
    - render qui retourne le template
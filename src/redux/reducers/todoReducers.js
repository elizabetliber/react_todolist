const getInitialState = () => {
    const localTodoList = window.localStorage.getItem('list');
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('list', []);
    return [];
};


const initialState = {
    list: getInitialState()
}

const todoReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const todolist = window.localStorage.getItem('list');

            if (todolist) {
                const todolistArr = JSON.parse(todolist);
                todolistArr.push({
                    ...action.payload,
                });

                window.localStorage.setItem('list', JSON.stringify(todolistArr));
            } else {
                window.localStorage.setItem(
                    'list',
                    JSON.stringify([
                        {
                            ...action.payload,
                        },
                    ])
                );
            }
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload
                ]
            }
        case 'DELETE_TODO':
            const todoList = window.localStorage.getItem('list');

            if (todoList) {
                const todolistArr = JSON.parse(todoList);

                let newArr = todolistArr.filter((elem) => elem.id !== action.id)

                window.localStorage.setItem('list', JSON.stringify(newArr));

                console.log("newArr", newArr)

                return {
                    ...state,
                    list: newArr
                }
            }

        case 'UPDATE_TODO':
            const todo_list = window.localStorage.getItem('list');
            if (todo_list) {
                const todoListArr = JSON.parse(todo_list);
                todoListArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.description = action.payload.description;
                    }
                });
                window.localStorage.setItem('list', JSON.stringify(todoListArr));
                return {
                    ...state,
                    list: todoListArr
                }
            }
        default:
            return state;
    }
}
export default todoReducers;
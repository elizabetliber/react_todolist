export const addTodo = (data) => {
    return {
        type: 'ADD_TODO',
        payload: data
    }
}

export const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        id
    }
}

export const updateTodo = (data) => {
    return {
        type: 'UPDATE_TODO',
        payload: data
    }
}
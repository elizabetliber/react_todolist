import React from 'react';
import {deleteTodo, updateTodo} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import "./TodoItem.css"
import moment from 'moment/dist/moment';
import ru from 'moment/dist/locale/ru';


function TodoItem({todo}) {
    const dispatch = useDispatch()

    const deleteItem = () => {
        const agreement = window.confirm("Are you sure you want to delete the todo?")

        if (agreement) {
            dispatch(deleteTodo(todo.id))
        }
    }

    const handleChange = () => {
        dispatch(
            updateTodo(
                {
                    ...todo,
                    checked: !todo.checked,
                    endDate: moment().locale("ru", ru).format('ll')
                })
        );
    };


    return (
        <div className="eachItem">
            <label>
                <input type="checkbox" checked={todo.checked} onChange={handleChange}/>
                <div className="textWrapper">
                    <h3 style={todo.checked ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{todo.title.length > 20 ? todo.title.slice(0, 16) + "..." : todo.title}</h3>
                    <p style={todo.checked ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{todo.description.length > 40 ? todo.description.slice(0, 40) + "..." : todo.description}</p>
                    <p className="date">Start: <span>{todo.startDate}</span></p>
                    {todo.checked && (<p>End: <span>{todo.endDate}</span></p>)}
                </div>
            </label>

            <div className="todo-btn">
                <i className="far fa-trash-alt add-btn" title="Delete Item"
                   onClick={deleteItem}></i>
                <Link to={`update/${todo.id}`}>
                    <i className="far fa-edit add-btn" title="Edit Item"></i>
                </Link>
            </div>
        </div>
    );
}

export default TodoItem;
import React from 'react';
import {deleteTodo} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import "./TodoItem.css"

function TodoItem({todo}) {
    const dispatch = useDispatch()

    const deleteItem = () => {
        const agreement = window.confirm("Are you sure you want to delete the todo?")

        if (agreement) {
            dispatch(deleteTodo(todo.id))
        }
    }
    return (
        <div className="eachItem">
            <label>
                <input type="checkbox"/>
                <div className="textWrapper">
                    <h3>{todo.title.length > 20 ? todo.title.slice(0, 20) + "..." : todo.title}</h3>
                    <p>{todo.description.length > 40 ? todo.description.slice(0, 40) + "..." : todo.description}</p>
                    <p style={{marginTop: "10px"}}>Start: <span>{todo.startDate}</span></p>
                    <p>End: <span>{todo.endDate}</span></p>
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
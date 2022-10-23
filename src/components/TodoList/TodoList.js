import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {addTodo, deleteTodo, removeTodo} from "../../redux/actions";
import "./TodoList.css"
import {Link} from "react-router-dom";
import TodoItem from "../TodoItem/TodoItem";

function TodoList() {
    const [visibleItems, setVisibleItems] = useState(15)
    const [showLoading, setShowLoading] = useState(false)
    const list = useSelector((state) => state.todoReducers.list)
    console.log(list.length)

    const slice = list.slice(0, visibleItems)

    const loadMore = () => {
        setShowLoading(false)
        setVisibleItems(visibleItems + visibleItems)
    }

    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setShowLoading(true)
            setTimeout(() => {
                loadMore()
            }, 1000)
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }

    }, []);

    return (
        <div className="todo_list">
            <Link to="/add" className="add_button">
                <p className="text">
                    Add Task
                </p>
                <i className='fa-solid fa-plus'></i>
            </Link>
            <div className="showItems">
                {slice.map((elem) => (<TodoItem key={elem.id} todo={elem}/>))}
            </div>

            {showLoading && <p style={{color: 'white', fontSize: "24px"}}>Loading....</p>}
        </div>
    );
}

export default TodoList;
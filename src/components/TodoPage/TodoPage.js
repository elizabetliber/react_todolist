import React, {useEffect, useState} from 'react';
import "./TodoPage.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, updateTodo} from "../../redux/actions";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

function TodoPage({type}) {
    moment.locale();
    const dispatch = useDispatch()
    let {itemId} = useParams();
    console.log(itemId)
    const todoItem = useSelector(state => state.todoReducers.list.find(el => el.id === itemId))
    console.log(todoItem)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (type === 'update' && todoItem) {
            setTitle(todoItem.title);
            setDescription(todoItem.description)
        } else {
            setTitle('');
            setDescription('')
        }
    }, [todoItem, type]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '' && description === '') {
            toast.error('Please enter a title');
            return;
        }
        if (title && description) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: new Date().getTime().toString(),
                        title,
                        description,
                        checked: false,
                        startDate: moment().locale("ru").format('ll'),
                        endDate: "30.03.2022",
                    })
                );
                toast.success('Task added successfully');

            }
            if (type === 'update') {
                if (todoItem.title !== title || todoItem.description !== description) {
                    dispatch(updateTodo({...todoItem, title, description}));
                    toast.success('Task Updated successfully');
                } else {
                    toast.error('No changes made');
                    return;
                }
            }
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
            <h3 >{type === 'add' ? 'Add Todo' : 'Update Todo'}</h3>
            <div className="todoItem">
                <input type="text" placeholder="Enter name" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Enter description" value={description}
                          onChange={e => setDescription(e.target.value)}/>
                <button className="add-todo" type="submit">{type === 'add' ? 'Add Task' : 'Update Task'}</button>

            </div>
        </form>
    );
}

export default TodoPage;
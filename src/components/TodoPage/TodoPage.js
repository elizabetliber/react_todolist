import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, updateTodo} from "../../redux/actions";
import {useNavigate, useParams} from "react-router-dom";
import "./TodoPage.css"
import moment from 'moment/dist/moment';
import ru from 'moment/dist/locale/ru';


function TodoPage({type}) {
    const {itemId} = useParams();
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const todoItem = useSelector(state => state.todoReducers.list.find(el => el.id === itemId))
    const dispatch = useDispatch()


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
            alert('Please enter a title and description');
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
                        startDate: moment().locale("ru", ru).format('ll'),
                    })
                );
                alert('Task added successfully');

            }
            if (type === 'update') {
                if (todoItem.title !== title || todoItem.description !== description) {
                    dispatch(updateTodo({...todoItem, title, description}));
                    alert('Task Updated successfully');
                } else {
                    alert('No changes made');
                    return;
                }
            }
            navigate('/')
        }
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3 className="formTitle">{type === 'add' ? 'Add Todo' : 'Update Todo'}</h3>
            <div className="todoItem">
                <input type="text" placeholder="Enter name" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Enter description" value={description}
                          onChange={e => setDescription(e.target.value)}/>
                <button className="button" type="submit">
                    <p>{type === 'add' ? 'Add Task' : 'Update Task'}</p>
                </button>
            </div>
        </form>
    );
}

export default TodoPage;
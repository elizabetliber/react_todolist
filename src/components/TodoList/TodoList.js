import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./TodoList.css"
import {Link} from "react-router-dom";
import TodoItem from "../TodoItem/TodoItem";
import {updateStatus} from "../../redux/actions";
import moment from 'moment/dist/moment';


function TodoList() {
    const list = useSelector((state) => state.todoReducers.list)
    const status = useSelector((state) => state.todoReducers.status)

    const dispatch = useDispatch()

    const [visibleItems, setVisibleItems] = useState(15)
    const [showLoading, setShowLoading] = useState(false)
    const [filtered, setFiltered] = useState(list)


    useEffect(() => {
        const todoFilter = (status) => {
            if (status === 'all') {
                const newAll = [...list].slice(0, visibleItems)
                setFiltered(newAll)
            } else if (status === "complete") {
                let newComplete = [...list].filter(el => el.checked === true)
                setFiltered(newComplete)
            } else if (status === "incomplete") {
                let newIncomplete = [...list].filter(el => el.checked !== true)
                setFiltered(newIncomplete)
            } else if (status === "name") {
                let newNameArr = [...list].sort((a, b) =>
                    a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0))
                setFiltered(newNameArr)
            } else if (status === "startDateASC") {
                let newStartDateArr = [...list].sort((a, b) =>
                    moment(a.startDate, 'll').isBefore(moment(b.startDate, 'll')) ? -1 : 1)
                setFiltered(newStartDateArr)
            } else if (status === "startDateDESC") {
                let newStartDateArr = [...list].sort((a, b) =>
                    moment(a.startDate, 'll').isBefore(moment(b.startDate, 'll')) ? 1 : -1)
                setFiltered(newStartDateArr)
            } else if (status === "endDateASC") {
                let newEndDateArr = [...list].filter(el => el.checked === true).sort((a, b) =>
                    moment(a.endDate, 'll').isBefore(moment(b.endDate, 'll')) ? -1 : 1)
                setFiltered(newEndDateArr)
            } else if (status === "endDateDESC") {
                let newEndDateArr = [...list].filter(el => el.checked === true).sort((a, b) =>
                    moment(a.endDate, 'll').isBefore(moment(b.endDate, 'll')) ? 1 : -1)
                setFiltered(newEndDateArr)
            }
        }
        todoFilter(status)
    }, [list, status, visibleItems])


    const loadMore = () => {
        setShowLoading(false)
        setVisibleItems(visibleItems + visibleItems)
    }

    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setShowLoading(true)
            setTimeout(() => {
                loadMore();
                if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
                    setShowLoading(false)
                    document.removeEventListener('scroll', handleScroll)
                }
            }, 1000)
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }

    }, [handleScroll]);


    const handleChange = (e) => {
        dispatch(updateStatus(e.target.value))

    }


    return (
        <div className="todolistWrapper">
            <div className="todoHeader">
                <Link to="/add" className="addButton">
                    <p>
                        Add Task
                    </p>
                    <i className='fa-solid fa-plus'></i>
                </Link>
                <select value={status} onChange={handleChange} defaultChecked>
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="incomplete">Incompleted</option>
                    <option value="name">Name</option>
                    <option value="startDateASC">Start date (asc)</option>
                    <option value="startDateDESC">Start date (desc)</option>
                    <option value="endDateASC">End date (asc)</option>
                    <option value="endDateDESC">End date (desc)</option>
                </select>
            </div>
            <div className="showItems">
                {filtered.length > 0
                    ? (filtered.map((elem) => (<TodoItem key={elem.id} todo={elem}/>)))
                    : (<p>The list is empty</p>)
                }
            </div>

            {showLoading && <p className="endText">Loading....</p>}
            {!showLoading && <p className="endText">End of the list</p>}
        </div>
    );
}

export default TodoList;
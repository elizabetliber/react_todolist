import './App.css';
import TodoList from "./components/TodoList/TodoList";
import TodoPage from "./components/TodoPage/TodoPage";
import {
    Route,
    Routes
} from "react-router-dom";


function App() {
    return (
        <div className="main_content">
            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="add" element={<TodoPage type="add"/>}/>
                <Route path="update/:itemId" element={<TodoPage type="update"/>}/>
            </Routes>
        </div>
    );
}

export default App;

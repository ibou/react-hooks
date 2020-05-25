import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';;

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (tasksMap) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(tasksMap)
    );
}
const initialTasksState = { tasks: [], completedTasks: [] };

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : initialTasksState;
}

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
};
const tasksReducer = (state, action) => {  

    console.log('state.. ', state, 'action', action );
    switch (action.type) {
        case TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            };

        case TYPES.COMPLETE_TASK:
            const { completedTask } = action;
            return {
                ...state,
                completedTasks: [...state.completedTasks, completedTask],
                tasks: state.tasks.filter(t=>t.id !== completedTask.id)
            };
        case TYPES.DELETE_TASK:
            const { deletedTask } = action;
            return {
                ...state, 
                completedTasks: state.completedTasks.filter(t=>t.id !== deletedTask.id)
            };

        default:
            return state;
    }

};

const Tasks = () => {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks(); 

    const [state, dispatch] = useReducer(tasksReducer, storedTasks);
    const {tasks, completedTasks} = state;




    useEffect(() => {
        const { tasks, completedTasks } = state;
        storeTasks({ tasks, completedTasks });
    } );

    const handleKeyPressed = event => {
        if (event.key === 'Enter') {
            addTask();
        }
    }
    const updateTaskText = event => {
        setTaskText(event.target.value);
    };
    const addTask = () => {
        dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuidv4() } });
    };
    const completeTask = completedTask => () => {
        dispatch({ type: TYPES.COMPLETE_TASK, completedTask }); 
    }
    const deleteTask = deletedTask => () => {
        // setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
        dispatch({ type: TYPES.DELETE_TASK, deletedTask }); 
    }

    return (
        <div>
            <h3>Tasks</h3>
            <div className="form">
                <input value={taskText}
                    onChange={updateTaskText}
                    onKeyPress={handleKeyPressed} />
                <button onClick={addTask}>Add New</button>
            </div>
            <div className="task-list">
                {
                    tasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id} onClick={completeTask(task)}>{taskText}</div>
                        );
                    })
                }
            </div>
            <hr />
            <div className="completed-list">
                {
                    completedTasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id}>
                                {taskText}{' '}
                                <span className='delete-task' onClick={deleteTask(task)}>X</span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );


};

export default Tasks;
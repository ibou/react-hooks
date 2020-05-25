import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';;

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (tasksMap) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(tasksMap)
    );
}

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : { tasks: [], completedTasks: [] };
}
const Tasks = () => {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

    useEffect(() => {
        storeTasks({ tasks, completedTasks });
    }, [tasks, completedTasks]);

    const handleKeyPressed = event => {
        if (event.key === 'Enter') {
            addTask();
        }
    }
    const updateTaskText = event => {
        setTaskText(event.target.value);
    };
    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuidv4() }]);
    };
    const completeTask = completedTask => () => {
        setCompletedTasks([...completedTasks, completedTask]);
        setTasks(tasks.filter(task => task.id !== completedTask.id));
    }
    const deleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
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
import React from 'react';
import { Task } from '../types';

interface Props {
    tasks: Task[];
    toggleFinish: (id: number) => void;
    removeTask: (id: number) => void;
}

const UnfinishedList: React.FC<Props> = ({ tasks, toggleFinish, removeTask }) => {
    return (
        <div className="task-list unfinished-tasks">
            <h2 className="task-list-title">To Do</h2>
            {tasks.filter(task => !task.isFinished).map(task => (
                <div className="task-item">
                    <label className="custom-checkbox-wrapper">
                        <input type="checkbox" className="custom-checkbox" checked={task.isFinished} onChange={() => toggleFinish(task.id)} />
                        <span className="task-title">
                            {task.title}
                        </span>
                    </label>
                    <div>
                        <button onClick={() => removeTask(task.id)} className="task-action-button remove-btn">❌</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UnfinishedList;

import React from 'react';
import { Task } from '../types';
import { motion } from 'framer-motion';

interface Props {
    tasks: Task[];
    removeTask: (id: number) => void;
}

const FinishedList: React.FC<Props> = ({ tasks, removeTask }) => {
    return (
        <div className="task-list finished-tasks">
            <h2 className="task-list-title">Done!</h2>
            {tasks.filter(task => task.isFinished).map(task => (
                <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="task-item finished-task-item">
                    {task.title && (
                        <span className="task-title">{task.title}</span>
                    )}
                    <button onClick={() => removeTask(task.id)} className="remove-btn">❌</button>
                </motion.div>
            ))}
        </div>
    );
};

export default FinishedList;

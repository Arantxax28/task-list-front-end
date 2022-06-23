import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({
  id,
  title,
  isComplete,
  updatingTasksCallback,
  deleteTasksCallback,
}) => {
  // const [complete, setComplete] = useState(isComplete);
  // const [taskStatus, setTaskStatus] = useState(props.isComplete);
  // const taskTitle = props.title;
  // const taskId = props.id;

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const setComplete = () => {
    updatingTasksCallback(id);
  };
  const deleteFunc = () => {
    deleteTasksCallback(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={setComplete}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteFunc}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updatingTasksCallback: PropTypes.func.isRequired,
  deleteTasksCallback: PropTypes.func.isRequired,
};

export default Task;

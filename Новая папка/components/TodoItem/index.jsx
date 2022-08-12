import { Checkbox } from '@mui/material';
import React from 'react'
import styles from "./TodoItem.module.css";
import CloseIcon from '@mui/icons-material/Close';

const TodoItem = ({ task, setTasks, tasks }) => {
  const { row } = styles;
  const { title, completed, id } = task;
  const handleChange = ({ target: { value } }) => {
    const remainingTasks = tasks.filter((el) => el.id !== id);
    const updatedTask = {
      ...task,
      completed: !completed,
    }

    setTasks([...remainingTasks, updatedTask])

  }

  const handleDelete = () => {
    const remainingTasks = tasks.filter((el) => el.id !== id);

    setTasks(remainingTasks);
  }

  return (
    <div className={row}>
      <Checkbox onChange={handleChange} defaultChecked={completed} />
      <div>{title}</div>
      <CloseIcon onClick={handleDelete} />
    </div>
  )
}

export default TodoItem
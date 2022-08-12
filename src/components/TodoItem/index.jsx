import { Checkbox } from '@mui/material';
import React, { useState } from 'react'
import styles from "./TodoItem.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, get_All_Tasks, updateTask } from '../../features/todos/todosSlice';
import MainDialog from '../../MainDialog';
import { Box } from '@mui/material';

const TodoItem = ({ task }) => {
  const [isShown, setShown] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector(get_All_Tasks);
  const { row } = styles;
  const { title, completed, id } = task;



  const handleChange = () => {
    dispatch(updateTask({ id, completed, title }));
  }

  const handleDelete = () => {
    setShown(true);
  }

  const dialogProps = {
    content: "Are you sure you want to delete?",
    onClose: () => setShown(false),
    onConfirm: () => dispatch(deleteTask(id))
  }

  return (
    <>
      <div className={row}>
        {isShown && <MainDialog {...dialogProps} />}

        <Box>
          <Checkbox sx={{ color: '#1976d2' }} onChange={handleChange} defaultChecked={completed} />
          <span style={{ opacity: completed ? .4 : .8, marginLeft: '35px' }}>{title}</span>
        </Box>
        <CloseIcon onClick={handleDelete} />
      </div>
      {/* <hr /> */}
    </>
  )
}

export default TodoItem
import React, { useEffect, useState } from 'react'
import TodoItem from '../TodoItem'
import Button from '@mui/material/Button'
import styles from "./TodoList.module.css";
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextFieldWrapper from '../TextFieldWrapper';
import { addTaskSchema } from '../validations';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, getIncompleteTasks, get_All_Tasks } from '../../features/todos/todosSlice';
import { getAllTasks } from '../../features/todos/todosSlice';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';


const TodoList = () => {
  const [isCompletedShown, setCompletedShown] = useState(true);

  const tasks = useSelector(get_All_Tasks);
  const incompleteTasks = useSelector(getIncompleteTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks'));
    dispatch(getAllTasks(data));
  }, [])

  const { row1, row2, row3, input, add, list, empty, row1_empty, row2_empty } = styles;

  const initialValues = {
    newTask: "",
  }

  const onSubmit = (values, { resetForm }) => {
    const newTask = {
      id: uuid(),
      title: values.newTask,
      completed: false
    }
    dispatch(addTask(newTask));
    resetForm({ values: '' });
  }

  const formik = useFormik({
    initialValues,
    validationSchema: addTaskSchema,
    onSubmit
  }
  );

  const textFieldProps = {
    name: 'newTask',
    label: 'Write here',
    onChange: formik.handleChange,
    value: formik.values.newTask,
    error: formik.errors.newTask,
    touched: formik.touched.newTask,
    onBlur: formik.handleBlur,
    variant: 'outlined'
  };

  const onCompletedChange = ({ target: { checked } }) => {
    setCompletedShown(!checked);
  }

  return (
    <div>
      <div className={row1}>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            onChange={onCompletedChange}
            value="end"
            control={<Checkbox sx={{ color: '#1976d2' }} />}
            label="Hide completed"
          />
        </FormGroup>
      </div>
      <div className={row2}>
        <span style={{ fontSize: '19px' }}>Task</span>
      </div>
      <Box component="form" className={row2} onSubmit={formik.handleSubmit}>
        <TextFieldWrapper className={input} {...textFieldProps} />
        <Button className={add} sx={{ ml: '35px', maxHeight: '55px' }} type='submit' variant="contained">Add</Button>
      </Box>

      {tasks.length ? <div className={list}>
        {(isCompletedShown ? tasks : incompleteTasks).map((task) => (
          <TodoItem key={uuid()} task={task} setTasks={() => { }} tasks={tasks} />
        ))}
      </div> : <div className={empty}>
        <div className={row1_empty}>Your life is a blank page. You write on it.</div>
        <div className={row2_empty}>So start by adding your tasks here.</div>
      </div>}


    </div>
  )
}

export default TodoList
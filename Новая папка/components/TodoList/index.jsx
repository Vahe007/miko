import React, { useEffect, useState } from 'react'
import TodoItem from '../TodoItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styles from "./TodoList.module.css";
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextFieldWrapper from '../TextFieldWrapper';
import { addTaskSchema } from '../validations';


const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(data);
  }, [])


  const { row1, row2, row3 } = styles;
  const initialValues = {
    newTask: "",
  }

  const onSubmit = (values, {resetForm}) => {
    const newTask = {
      id: uuid(),
      title: values.newTask,
      completed: false
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    setTasks((prevTasks) => [...prevTasks, newTask]);
    resetForm({values: ''});
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
  return (
    <div>
      <div className={row2}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextFieldWrapper sx={{ width: '80%' }} {...textFieldProps} />
          <Button type='submit' sx={{ height: '100%' }} variant="contained">Add</Button>
        </Box>
      </div>
      
      {(tasks).map((task) => (
        <TodoItem key={uuid()} task={task} setTasks={setTasks} tasks={tasks} />
      ))}
    </div>
  )
}

export default TodoList
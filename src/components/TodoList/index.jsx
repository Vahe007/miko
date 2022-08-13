import React, { useEffect, useRef, useState } from 'react'
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
import ButtonWrapper from '../Button';
import CloseIcon from '@mui/icons-material/Close';




const TodoList = () => {
  const [isCompletedShown, setCompletedShown] = useState(true);
  const inputRef = useRef(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const tasks = useSelector(get_All_Tasks);
  const incompleteTasks = useSelector(getIncompleteTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(getAllTasks(data));
  }, [])

  // const isFocused = (inputRef?.current?.children[1]?.children[0] === document.activeElement);

  // useEffect(() => {
  //   setInputFocused(isFocused);
  // }, [isFocused])

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
    // onBlur: formik.handleBlur,
    variant: 'outlined',
    sx: {
      width: '80%',
    }
  };

  const onCompletedChange = ({ target: { checked } }) => {
    setCompletedShown(!checked);
  }
  return (
    <div>
      <div className={row1}>
        <FormGroup sx={{ display: 'flex', alignItems: 'center' }} row >
          <Checkbox onChange={onCompletedChange} sx={{ color: '#1976d2', fontWeight: 700 }} />
          <span style={{ fontWeight: 700, textAlign: 'center', fontSize: '20px' }}>Hide completed</span>
        </FormGroup>
      </div>
      <div className={row2}>
        <span style={{ fontSize: '19px' }}>Task</span>
      </div>
      <Box component="form" className={row2} onSubmit={formik.handleSubmit}>
        <TextFieldWrapper  onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} InputProps={{
          endAdornment: isInputFocused ? (
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {return console.log('oooooo');}}
            />) : null

        }} {...textFieldProps} />
        <ButtonWrapper type='submit' title="Add" style={{ marginLeft: '35px' }} />
        {/* <Button size='large' sx={{ ml: '35px', maxHeight: '55px' }} type='submit' variant="contained">Add</Button> */}
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
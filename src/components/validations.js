import * as Yup from 'yup';

export const addTaskSchema = Yup.object().shape({
  newTask: Yup.string()
    .max(54, 'Task content can contain max 54 characters')
    .required('Required!'),
});

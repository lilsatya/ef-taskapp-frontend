import * as Yup from 'yup'

export default Yup.object().shape({
  assignee: Yup.object()
    .required('Please select an assignee' ),
  title: Yup.string()
    .max(40, 'Please enter no more than 40 characters')
    .required('Please enter a title'),
  description: Yup.string()
    .max(255, 'Please enter no more than 255 characters')
    .required('Please enter a description'),
  tags: Yup.array()
    .required('Please select at least 1 tag')
    .min(1, 'Please select at least 1 tag')
})
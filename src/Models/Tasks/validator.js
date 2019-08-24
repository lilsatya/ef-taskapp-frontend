import * as Yup from 'yup'

export default Yup.object().shape({
  username: Yup.string()
    .required( 'Please select the username' ),
  description: Yup.string()
    .max(255, 'Please enter no more than 255 characters')
    .required('Please enter a description')
})
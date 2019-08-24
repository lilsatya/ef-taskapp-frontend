import React from 'react'
import { Box, Button, Text } from 'rebass'
import { Label, Textarea, Select } from '@rebass/forms'
import { Formik } from 'formik'
import Modal from 'react-modal'
import theme from '../../Theme'
import { ModelValidator } from '../../Models/Tasks'
import text from './text'

Modal.setAppElement('#root') // for accessibility

const Index = props => {
  const { opened, onSubmit, onClose, userList, initialValues } = props
  const userListMapped = userList.map((value) => {
    return (<option key={value.id}>{value.username}</option>)
  })

  return (
    <Modal
      isOpen={opened}
      contentLabel={text.label}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={theme.modal}
    >
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values)
        console.log(actions)
        onSubmit(values)
        
      }}
      validationSchema={ModelValidator}
      render={props => {
        return (
          <form
            onSubmit={props.handleSubmit}
          >
            <Box mb={20} width={1} px={2}>
              <Label pb={10} htmlFor='username'>Username</Label>
              <Select
                id='username'
                name='username'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
              >
                <option> </option>
                { userListMapped }
              </Select>
              {props.touched.username && props.errors.username &&
                <Text pt={2} variant='error'>{props.errors.username}</Text>
              }
            </Box>
            <Box mb={20} width={1} px={2}>
              <Label pb={10} htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                style={{
                  width: '100%'
                }}
                rows={10}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
              />
              {props.touched.description && props.errors.description &&
                <Text pt={2} variant='error'>{props.errors.description}</Text>
              }
            </Box>
            
            <Button
              variant='primary'
              type='submit'
              px={2}
            >
              Submit
            </Button>
          </form>
        )}
      }
     />
    </Modal>
  )
}

export default Index
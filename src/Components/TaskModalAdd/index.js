import React from 'react'
import { Box, Button, Text, Heading } from 'rebass'
import { Label, Input, Textarea, Select } from '@rebass/forms'
import DatePicker from 'react-date-picker'
import { Formik } from 'formik'
import Modal from 'react-modal'
import theme from '../../Theme'
import { ModelValidator } from '../../Models/Tasks'
import text from './text'

import ReactTags from '../TagInput'

Modal.setAppElement('#root') // for accessibility

const Index = props => {
  const { opened, onSubmit, onClose, userList, initialValues, tagList } = props
  const userListMapped = userList.map((user) => {
    return (<option key={user.id} value={ JSON.stringify(user) }>{user.username}</option>)
  })

  return (
    <Modal
      isOpen={opened}
      contentLabel={text.label}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={theme.modal}
    >
      <Heading mb={10} fontSize={3}>{text.label}</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
        validationSchema={ModelValidator}
        render={props => {
          return (
            <form
              onSubmit={props.handleSubmit}
            >
              <Box mb={20} width={1}>
                <Label pb={10} htmlFor='assignee'>Assignee</Label>
                <Select
                  id='assignee'
                  name='assignee'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.assignee}
                >
                  <option value={null} />
                  { userListMapped }
                </Select>
                {props.touched.assignee && props.errors.assignee &&
                  <Text pt={2} variant='error'>{props.errors.assignee}</Text>
                }
              </Box>
              <Box mb={20} width={1}>
                <Label pb={10} htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  name='title'
                  style={{
                    width: '100%'
                  }}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                />
                {props.touched.title && props.errors.title &&
                  <Text pt={2} variant='error'>{props.errors.title}</Text>
                }
              </Box>
              <Box mb={20} width={1}>
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
              <Box mb={20} width={1}>
                <Label pb={10} htmlFor='dueDate'>Due Date</Label>
                <DatePicker
                  name='dueDate'
                  onChange={e => props.setFieldValue('dueDate', e)}
                  value={props.values.dueDate}
                  minDate={new Date()}
                  format='dd/MM/y'
                />
                {props.touched.dueDate && props.errors.dueDate &&
                  <Text pt={2} variant='error'>{props.errors.dueDate}</Text>
                }
              </Box>
              <Box mb={20} width={1}>
                <Label pb={10} htmlFor='tags'>Tags</Label>
                <ReactTags
                  value={props.values.tags}
                  suggestions={tagList}
                  onChange={e => props.setFieldValue('tags', e)}
                />
                {props.touched.dueDate && props.errors.dueDate &&
                  <Text pt={2} variant='error'>{props.errors.dueDate}</Text>
                }
              </Box>
              
              <Button
                variant='primary'
                type='submit'
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
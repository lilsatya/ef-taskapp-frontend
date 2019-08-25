import React from 'react'
import { Box, Heading, Flex, Text, Button } from 'rebass'
import Modal from 'react-modal'
import theme from '../../Theme'
import colors from '../../Theme/colors'
import dateFormatter from '../../Utils/date-formatter'

Modal.setAppElement('#root') // for accessibility

const Index = props => {
  const { opened, onClose, task } = props
  const overdue = task && new Date().getTime() > new Date(task.dueDate).getTime()

  return task && (
    <Modal
      isOpen={opened}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={theme.modal}
    >
      <Box>
        <Flex mb={10} justifyContent='space-between' alignItems='top'>
          <Heading fontSize={5}>{task.title}</Heading>
          <Box>
            <Button
              variant='primary'
              onClick={onClose}
              mr={10}
            >
              Edit
            </Button>
            <Button
              variant='primary'
              onClick={onClose}
              mr={10}
            >
              Remove
            </Button>
            <Button
              variant='primary'
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Flex>
        <hr />
        <Flex mb={50} justifyContent='space-between'>
          <Box>
            <Text><b>Due on:</b> {dateFormatter(task.dueDate)}</Text>
            <Text><b>Assignee:</b> {task.assignee && task.assignee.username}</Text>
            <Text pt={10} fontWeight='bold' fontSize={16} color={colors.red}>{overdue && 'OVERDUE'}</Text>
          </Box>
          <Box>
            <Text textAlign='right'><b>Reported on:</b> {dateFormatter(task.createdAt)}</Text>
            <Text textAlign='right'><b>Reporter:</b> {task.reporter && task.reporter.username}</Text>
          </Box>
        </Flex>
        <Box mb={50}>
          <Text><b>Description</b></Text>
          <hr />
          <Box>
            {task.description}
          </Box>
        </Box>
        <Box mb={50}>
          <Text><b>Tags</b></Text>
          <hr />
          <Box>
            {task.tags && task.tags.map((tag, index) => {
              return (
                <Box fontSize={14} key={index} variant='tag'>{tag}</Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default Index
import React from 'react'
import { Box, Heading, Flex, Text, Button } from 'rebass'
import Modal from 'react-modal'
import theme from '../../Theme'
import colors from '../../Theme/colors'
import dateFormatter from '../../Utils/date-formatter'
import { TASK_STATUS_BACKLOG, TASK_STATUS_IN_PROGRESS, TASK_STATUS_COMPLETED, LABEL_TASK_STATUS } from '../../Config/task-status'

Modal.setAppElement('#root') // for accessibility

const Index = props => {
  const { opened, onClose, onEdit, onMoveCard, onRemove, task } = props
  const overdue = task && new Date().getTime() > new Date(task.dueDate).getTime()
  const isCompleted = task && task.status === TASK_STATUS_COMPLETED
  const MoveButton = (props) => {
    switch (props.task.status) {
      case TASK_STATUS_BACKLOG:
        return (
          <Button
            variant='primary'
            bg={colors.fifth}
            onClick={() => onMoveCard(TASK_STATUS_IN_PROGRESS, task)}
            mr={10}
          >
            Move to {LABEL_TASK_STATUS[TASK_STATUS_IN_PROGRESS]}
          </Button>
        )
      case TASK_STATUS_IN_PROGRESS:
          return (
            <>
              <Button
                variant='primary'
                bg={colors.fifth}
                onClick={() => onMoveCard(TASK_STATUS_BACKLOG, task)}
                mr={10}
              >
                Move to {LABEL_TASK_STATUS[TASK_STATUS_BACKLOG]}
              </Button>
              <Button
                variant='primary'
                bg={colors.fifth}
                onClick={() => onMoveCard(TASK_STATUS_COMPLETED, task)}
                mr={10}
              >
                Move to {LABEL_TASK_STATUS[TASK_STATUS_COMPLETED]}
              </Button>
            </>
          )
      case TASK_STATUS_COMPLETED:
          return (
            <Button
              variant='primary'
              bg={colors.fifth}
              onClick={() => onMoveCard(TASK_STATUS_IN_PROGRESS, task)}
              mr={10}
            >
              Move to {LABEL_TASK_STATUS[TASK_STATUS_IN_PROGRESS]}
            </Button>
          )
      default:
        return <></>
    }
  }

  return (
    <Modal
      isOpen={opened}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={theme.modal}
    >
      {task && (
        <Box>
          <Flex mb={10} justifyContent='space-between' alignItems='top'>
            <Heading fontSize={5}>{task.title}</Heading>
            <Box>
              <Button
                variant='primary'
                onClick={() => onEdit(true, task)}
                mr={10}
              >
                Edit
              </Button>
              <Button
                variant='primary'
                onClick={() => onRemove(task._id)}
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
              <Text><b>{isCompleted ? 'Completed on :' : 'Due on :'}</b> {dateFormatter(isCompleted ? task.completedAt: task.dueDate)}</Text>
              <Text><b>Assignee:</b> {task.assignee && task.assignee.username}</Text>
              <Text pt={8}><b>{LABEL_TASK_STATUS[task.status]}</b></Text>
              <Text pt={8} fontWeight='bold' fontSize={16} color={colors.red}>{overdue && !isCompleted && 'OVERDUE'}</Text>
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
              {task.tags && task.tags.map(tag => {
                return (
                  <Box fontSize={14} key={tag} variant='tag'>{tag}</Box>
                )
              })}
            </Box>
          </Box>
          <Box>
            <MoveButton task={task}/>
          </Box>
        </Box>
      )}
    </Modal>
  )
}

export default Index
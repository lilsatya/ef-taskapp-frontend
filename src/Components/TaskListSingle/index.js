import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Box, Card, Text, Heading, Flex } from 'rebass'
import dateFormatter from '../../Utils/date-formatter'
import colors from '../../Theme/colors'
import { actions as AppActions } from '../../Redux/app'
import useDebounce from '../../Utils/react-debounce'
import { TASK_STATUS_COMPLETED } from '../../Config/task-status'


const Index = props => {
  const { tasks, label, handleModalTaskOpen } = props
  const [tasksMapped, setTasksMapped] = useState(<></>)

  const debouncedListRender = useDebounce(tasksMapped, 10) // Need to debounce because of late props assignment

  useEffect(() => {
    const handleModalOpen = (task) => {
      handleModalTaskOpen(true, task)
    }

    if (debouncedListRender) {
      setTasksMapped(tasks.map(task => {
        const overdue = new Date().getTime() > new Date(task.dueDate).getTime()
        const isCompleted = task.status === TASK_STATUS_COMPLETED
        return (
          <Card
            width={1}
            mb={10}
            variant='listItemContainer'
            onClick={() => handleModalOpen(task)}
            key={task._id}
          >
            <Flex
              justifyContent='space-between'
              alignItems='top'
            >
              <Box>
                <Text
                  variant='subtitle'
                  mb={10}
                  fontSize={14}
                >
                  {task.title}
                </Text>
                <Text fontSize={12}>{isCompleted ? 'Completed on :' : 'Due on :'} {dateFormatter(isCompleted ? task.completedAt: task.dueDate)}</Text>
              </Box>
              
              <Box>
                <Text fontSize={12} textAlign='right' mb={10}>{task.assignee.username}</Text>
                <Text fontSize={12} textAlign='right' color={colors.red}>{overdue && !isCompleted &&  'OVERDUE'}</Text>
              </Box>
            </Flex>
            <hr />
            <Text fontSize={14} mb={30}>{`${task.description.slice(0, 100)}`}</Text>
            <Text>
              {task.tags.map(tag => {
                return (
                  <Box key={tag} variant='tag'>{tag}</Box>
                )
              })}
            </Text>
          </Card>
        )
      }))
    }
  }, [debouncedListRender])

  return (
    <Box
      width={1}
      mr={4}
      variant='listContainer'
    >
      <Heading
        pb={40}
        pl={10}
        fontSize={3}
      >
        {label}
      </Heading>
      {tasksMapped}
    </Box>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleModalTaskOpen: (open, task) => AppActions.ModalTaskDetailOpen(open, task)
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(Index)
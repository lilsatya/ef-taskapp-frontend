import React, { useState, useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Box, Card, Text, Heading, Flex, Button } from 'rebass'
import dateFormatter from '../../Utils/date-formatter'
import colors from '../../Theme/colors'
import text from './text'
import { actions as AppActions } from '../../Redux/app'
import useDebounce from '../../Utils/react-debounce'


const Index = props => {
  const { tasks, label, handleModalTaskOpen } = props
  const [tasksMapped, setTasksMapped] = useState(<></>)

  const debouncedListRender = useDebounce(tasksMapped, 10) // Need to debounce because of late props assignment

  useEffect(() => {
    const handleModalOpen = (task) => {
      handleModalTaskOpen(true, task)
    }

    if (debouncedListRender) {
      setTasksMapped(tasks.map((task, index) => {
        const overdue = new Date().getTime() > new Date(task.dueDate).getTime()
        return (
          <Card
            width={1}
            mb={10}
            variant='listItemContainer'
            onClick={() => handleModalOpen(task)}
            key={index}
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
                <Text fontSize={12}>Due on: {dateFormatter(task.dueDate)}</Text>
              </Box>
              
              <Box>
                <Text fontSize={12} textAlign='right' mb={10}>{task.assignee.username}</Text>
                <Text fontSize={12} textAlign='right' color={colors.red}>{overdue && 'OVERDUE'}</Text>
              </Box>
            </Flex>
            <hr />
            <Text fontSize={14} mb={30}>{task.description}</Text>
            <Text>
              {task.tags.map((tag, index) => {
                return (
                  <Box key={index} variant='tag'>{tag}</Box>
                )
              })}
            </Text>
            <Box
              mt={20}
            >
              <Button
                variant='primary'
                mr={2}
                p={2}
                fontSize={10}
                onClick={() => this.setState({ taskAddOpened: true })}
              >
                {text.TASK_LIST_TEXT_BUTTON_EDIT}
              </Button>
              <Button
                variant='primary'
                mr={2}
                p={2}
                fontSize={10}
                onClick={() => this.setState({ taskAddOpened: true })}
              >
                {text.TASK_LIST_TEXT_BUTTON_REMOVE}
              </Button>
            </Box>
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
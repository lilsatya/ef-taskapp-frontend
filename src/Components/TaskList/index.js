import React, { useState, useEffect } from 'react'
import { Flex, Box } from 'rebass'
import { TASK_STATUS_BACKLOG, TASK_STATUS_IN_PROGRESS, TASK_STATUS_COMPLETED, LABEL_TASK_STATUS } from '../../Config/task-status'
import TaskListSingle from '../TaskListSingle'

const initialState = {
  [TASK_STATUS_BACKLOG]: [],
  [TASK_STATUS_IN_PROGRESS]: [],
  [TASK_STATUS_COMPLETED]: []
}

const Index = props => {
  const [taskListCategorized, setTaskListCategorized] = useState(initialState)

  useEffect(() => {
    const filterTaskList = async () => {
      const taskList = initialState
      await props.taskList.forEach(task => {
        switch (task.status) {
          case TASK_STATUS_BACKLOG:
            if (taskList[TASK_STATUS_BACKLOG].filter(val => val._id === task._id).length < 1 ) {
              return taskList[TASK_STATUS_BACKLOG].push(task)
            }
            break
          case TASK_STATUS_IN_PROGRESS:
            if (taskList[TASK_STATUS_IN_PROGRESS].filter(val => val._id === task._id).length < 1 ) {
              return taskList[TASK_STATUS_IN_PROGRESS].push(task)
            }
            break
          case TASK_STATUS_COMPLETED:
            if (taskList[TASK_STATUS_COMPLETED].filter(val => val._id === task._id).length < 1 ) {
              return taskList[TASK_STATUS_COMPLETED].push(task)
            }
            break
          default:
            return false
        }
      })

      setTaskListCategorized(taskList)
    }

    filterTaskList()
  })

  const taskListMapped = Object.keys(taskListCategorized).map((category, index) => {
    return (
      <TaskListSingle
        key={index}
        tasks={taskListCategorized[category].sort((a, b) => new Date(b.dirtyAt) - new Date(a.dirtyAt))} // sort by latest update
        label={LABEL_TASK_STATUS[category]}
      />
    )
  })

  return (
    <Flex
      mt={10}
      width={1}
      justifyContent='space-between'
      alignItems='top'
    >
      {taskListMapped}
    </Flex>
  )
}

export default Index
import React from 'react'
import { Box, Card, Text, Heading } from 'rebass'

const Index = props => {
  const { tasks, label } = props
  const tasksMapped = tasks.map((task, index) => {
    return (
      <Card
        width={1}
        mb={10}
        variant='listItemContainer'
        key={index}
      >
        <Text>{task.title}</Text>
        <Text>{task.assignee.username}</Text>
        <Text>{task.description}</Text>
        <Text>{task.dueDate}</Text>
        <Text>
          {task.tags.map((tag, index) => {
            return (
              <Box key={index} variant='tag'>{tag}</Box>
            )
          })}
        </Text>
      </Card>
    )
  })

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

export default Index
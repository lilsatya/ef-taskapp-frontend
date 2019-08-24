import React from 'react'
import { Box } from 'rebass'

const Index = props => {
  const { task } = props

  return (
    <Box
      width={1}
      ml={20}
      mr={20}
    >
      {task}
    </Box>
  )
}

export default Index
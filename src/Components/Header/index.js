import React from 'react'
import { Box, Heading, Flex, Text } from 'rebass'
import colors from '../../Theme/colors'

const Index = props => (
  <Box
    p={20}
    mb={10}
    width={1}
    bg={colors.main}
  >
    <Flex
      alignItems='center'
      justifyContent='space-between'
    >
      <Box
        width={8/10}
      >
        <Heading
          fontSize={4}
        >
          Tasklist App
        </Heading>
      </Box>
      <Box
        width={1/10}
      >
        <Text>
          Sign In
        </Text>
      </Box>
      <Box
        width={1/10}
      >
        <Text>
          Register
        </Text>
      </Box>
    </Flex>
  </Box>
)

export default Index
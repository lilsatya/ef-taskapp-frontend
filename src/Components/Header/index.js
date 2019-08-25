import React from 'react'
import { Box, Heading, Flex, Text } from 'rebass'
import { Detector } from 'react-detect-offline'
import colors from '../../Theme/colors'
import textContent from './text'

const Index = props => (
  <Box
    p={20}
    width={1}
    bg={colors.main}
    sx={{
      position: 'fixed'
    }}
  >
    <Flex
      alignItems='center'
      justifyContent='space-between'
    >
      <Box
        width={7/10}
      >
        <Heading
          fontSize={4}
        >
          Tasklist App
        </Heading>
      </Box>
      <Box
        width={3/10}
      >
        <Detector
          render={({ online }) => (
            <Text
              p={10}
              color={online ? colors.white : colors.red}
              sx={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '5px',
                borderColor: online ? colors.white : colors.red,
              }}
            >
              {online ? textContent.HOME_TEXT_ONLINE : textContent.HOME_TEXT_OFFLINE}
            </Text>
          )}
        />
      </Box>
    </Flex>
  </Box>
)

export default Index
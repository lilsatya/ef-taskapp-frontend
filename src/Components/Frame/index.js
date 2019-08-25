import React from 'react'
import { Box } from 'rebass'
import Header from '../Header'
import theme from '../../Theme'
import { ThemeProvider } from 'emotion-theming'

const Index = props => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        pt={100}
        width={1}
      >
        <Box
          ml={20}
          mr={20}
        >
          { props.children }
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Index
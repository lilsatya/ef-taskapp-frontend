import colors from './colors'

export default {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  space: [
    0, 4, 8, 16, 32, 64, 128, 256
  ],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  },
  variants: {
  },
  text: {
    color: colors.text,
    error: {
      color: colors.error
    }
  },
  buttons: {
    primary: {
      color: colors.text,
      bg: colors.main,
    }
  },
  modal: {
    content: {
      height: '70%',
      width: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      top: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}
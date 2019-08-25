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
  input: {
    borderColor: colors.lines
  },
  select: {
    borderColor: colors.lines
  },
  textarea: {
    borderColor: colors.lines
  },
  text: {
    color: colors.dark,
    error: {
      color: colors.red
    }
  },
  buttons: {
    primary: {
      color: colors.white,
      bg: colors.main,
      boxShadow: 'small'
    }
  },
  variants: {
    listContainer: {
      borderRadius: 10,
      bg: colors.white,
      p: 8
    },
    listItemContainer: {
      borderRadius: 5,
      bg: colors.background,
      p: 10,
      boxShadow: 'small'
    },
    tag: {
      display: 'inline-block',
      p: 2,
      mr: 1,
      borderRadius: 20,
      bg: colors.third,
      color: colors.white
    }
  },
  modal: {
    content: {
      height: '85%',
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
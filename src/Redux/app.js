import Immutable from 'seamless-immutable'

// Create Immutable object
const actionTypes = Immutable({
  MODAL_TASK_OPEN: 'app/MODAL_TASK_OPEN',
  MODAL_TASK_DETAIL_OPEN: 'app/MODAL_TASK_DETAIL_OPEN',
  MODAL_TASK_CLOSE_ALL: 'app/MODAL_TASK_CLOSE_ALL'
})

// Actions
export const actions = {
  ModalTaskOpen: (open) => {
    return {
      type: actionTypes.MODAL_TASK_OPEN,
      open,
    }
  },
  ModalTaskDetailOpen: (open, task) => {
    return {
      type: actionTypes.MODAL_TASK_DETAIL_OPEN,
      open,
      task
    }
  },
  ModalTaskCloseAll: () => {
    return {
      type: actionTypes.MODAL_TASK_CLOSE_ALL
    }
  }
}

// Selectors
export const selector = {
  selectModalTaskOpened: state => state.app.modalTaskOpened,
  selectModalTaskDetailOpened: state => state.app.modalTaskDetailOpened,
  selectTaskDetail: state => state.app.task
}

// Reducers
export const INITIAL_STATE = Immutable({
  modalTaskOpened: false,
  modalTaskDetailOpened: false,
  task: null
})

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MODAL_TASK_OPEN:
      return state.merge({ modalTaskOpened: action.open })
    case actionTypes.MODAL_TASK_DETAIL_OPEN:
      return state.merge({ modalTaskDetailOpened: action.open, task: action.task })
    case actionTypes.MODAL_TASK_CLOSE_ALL:
      return state.merge({
        modalTaskOpened: false,
        modalTaskDetailOpened: false,
        task: null
      })
    default:
      return state
  }
}
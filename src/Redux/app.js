import Immutable from 'seamless-immutable'

// Create Immutable object
const actionTypes = Immutable({
  MODAL_TASK_OPEN: 'app/MODAL_TASK_OPEN',
  MODAL_TASK_DETAIL_OPEN: 'app/MODAL_TASK_DETAIL_OPEN',
  MODAL_TASK_CLOSE_ALL: 'app/MODAL_TASK_CLOSE_ALL',
  TASK_LIST_SAVE: 'app/TASK_LIST_SAVE'
})

// Actions
export const actions = {
  ModalTaskOpen: (open, task) => {
    return {
      type: actionTypes.MODAL_TASK_OPEN,
      open,
      task
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
  },
  TaskListSave: taskList => {
    return {
      type: actionTypes.TASK_LIST_SAVE,
      taskList
    }
  }
}

// Selectors
export const selector = {
  selectModalTaskOpened: state => state.app.modalTaskOpened,
  selectModalTaskDetailOpened: state => state.app.modalTaskDetailOpened,
  selectTaskDetail: state => state.app.task,
  selectTaskList: state => state.app.taskList
}

// Reducers
export const INITIAL_STATE = Immutable({
  modalTaskOpened: false,
  modalTaskDetailOpened: false,
  task: null,
  taskList: []
})

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MODAL_TASK_OPEN:
      return state.merge({modalTaskOpened: action.open, task: action.task })
    case actionTypes.MODAL_TASK_DETAIL_OPEN:
      return state.merge({ modalTaskDetailOpened: action.open, task: action.task })
    case actionTypes.MODAL_TASK_CLOSE_ALL:
      return state.merge({
        modalTaskOpened: false,
        modalTaskDetailOpened: false,
        task: null
      })
    case actionTypes.TASK_LIST_SAVE:
      return state.merge({ taskList: action.taskList })
    default:
      return state
  }
}
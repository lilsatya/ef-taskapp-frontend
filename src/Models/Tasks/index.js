import PouchyStore from 'pouchy-store'
import config from '../../Config/pouchy-store'
import validator from './validator'
import { TASK_STATUS_BACKLOG } from '../../Config/task-status'

class Model extends PouchyStore {
  get name() {
    return this._name
  }

  setName(name) {
    this._name = name
  }

  get urlRemote() {
    return config.couchDBUrl
  }

  get optionsRemote() {
    return {
      auth: config.couchDBAuth
    }
  }
}

export default new Model()
export const ModelValidator = validator
export const InitialValues = {
  assignee: '',
  reporter: '',
  title: '',
  status: TASK_STATUS_BACKLOG,
  description: '',
  dueDate: new Date(),
  tags: []
}


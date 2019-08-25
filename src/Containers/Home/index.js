import React from 'react'
import { Box, Button, Flex } from 'rebass'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Detector } from 'react-detect-offline'
import Model, { InitialValues } from '../../Models/Tasks'
import { selector as UserSelector } from '../../Redux/user'
import { actions as AppActions, selector as AppSelector } from '../../Redux/app'
import textContent from './text'
import { TASK_STATUS_COMPLETED } from '../../Config/task-status'

// Components
import Frame from '../../Components/Frame'
import TaskCard from '../../Components/TaskCard'
import TaskModalAdd from '../../Components/TaskModalAdd'
import TaskList from '../../Components/TaskList'
import colors from '../../Theme/colors'

// Combining tags fetched from all tasks for the tag input suggestion
const combineTags = (data, index = data.length - 1, tags = []) => {
  if (index < 0) {
    return tags
  } else {
    for (let i = 0; i < data[index].tags.length; i++) {
      const duplicate = tags.filter(tag => (tag === data[index].tags[i]))
      if (duplicate.length < 1) {
        tags.push(data[index].tags[i])
      }
    }
    return combineTags(data, index - 1, tags)
  }
}

const lastSync = localStorage.getItem('lastSync')

class Index extends React.PureComponent {
  state = {
    unsub: null, // using state because using direct object isn't working
    taskList: [],
    lastSyncDate: lastSync ? new Date(JSON.parse(lastSync)) : 'Never',
    loading: false,
    taskAddOpened: false,
    taskDetailOpened: false,
    tagList: []
  }

  async componentDidMount() {
    this.setState({
      unsub: await Model.subscribe(this.handleUpdate),
      loading: true
    })
  }

  async componentDidUpdate() {
    const { user } = this.props

    if (!Model.isInitialized && user) {
      Model.setName(user.id)	// to set databasename for model
      await Model.initialize() // to initialize database locally by getting synced
    }

    if (Model.data.length > 0) {
      const tagList = combineTags(Model.data)

      if (JSON.stringify(this.state.tagList) !== JSON.stringify(tagList)) { // Need to stringify to check if both arrays are equal
        this.setState({ tagList })
      }
    }
    this.setState({ loading: false })
  }

  async componentWillUnmount() {
    const { unsub } = this.state

    unsub && unsub()
    await Model.deinitialize() // to destroy database locally if it's needed
  }

  handleUpdate = () => {
    const { handleTaskListSave } = this.props

    this.setState({
      lastSyncDate: new Date(JSON.parse(localStorage.getItem('lastSync')))
    })
    handleTaskListSave(Model.data)
  }

  handleRemove = async id => {
    try {
      await Model.deleteItem(id)

      alert(textContent.HOME_TEXT_ALERT_TASK_DELETED)
      this.handleModalClose()
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async (values, taskDetail) => {
    const { user } = this.props
    const { title, assignee, description, status, dueDate, tags } = values
    const body = {
      title,
      assignee: JSON.parse(assignee), // option only limited to string and numbers, so i did stringify + parse
      reporter: user,
      description,
      status,
      dueDate,
      tags
    }

    try {
      if (taskDetail) {
        await Model.editItem(taskDetail._id, body)
      } else {
        await Model.addItem(body)
      }

      alert(taskDetail ? textContent.HOME_TEXT_ALERT_TASK_UPDATED : textContent.HOME_TEXT_ALERT_TASK_CREATED)
      this.handleModalClose()
    } catch (err) {
      console.log(err)
    }
  }

  handleMoveCard = async (status, task) => {
    const body = {
      status
    }

    if (status === TASK_STATUS_COMPLETED) {
      body.completedAt = new Date()
    }

    try {
      await Model.editItem(task._id, body)

      alert(textContent.HOME_TEXT_ALERT_TASK_UPDATED)
      this.handleModalClose()
    } catch (err) {
      console.log(err)
    }
  }

  handleUpload = async () => {
    await Model.upload()

    alert(textContent.HOME_TEXT_ALERT_SYNC_COMPLETE)
    localStorage.setItem('lastSync', JSON.stringify(new Date()))
  }

  handleModalClose = () => {
    const { handleModalCloseAll } = this.props
    handleModalCloseAll()
  }

  render() {
    const { user, userList, handleModalTaskOpen, modalTaskOpened, modalTaskDetailOpened, taskDetail, taskList } = this.props
    const { lastSyncDate, loading, tagList } = this.state

    return (
      <Frame loading={loading}>
        <TaskCard
          opened={modalTaskDetailOpened}
          onClose={this.handleModalClose}
          onEdit={handleModalTaskOpen}
          onMoveCard={this.handleMoveCard}
          onRemove={this.handleRemove}
          task={taskDetail}
        />
        <TaskModalAdd
          opened={modalTaskOpened}
          initialValues={InitialValues}
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          userList={userList}
          tagList={tagList}
        />
        <Box
          width={1}
        >
          <h3>Welcome, {user.username}!</h3>
          <p>Last Sync Date: {lastSyncDate ? lastSyncDate.toString() : 'Never'}</p>
        </Box>
          <Detector
            render={({ online }) => {
              return (
                <Flex
                  width={1}
                  variant='inline'
                >
                  <Box
                    width={1}
                  >
                    <Button
                      variant='primary'
                      mr={2}
                      onClick={() => handleModalTaskOpen(true)}
                    >
                      {textContent.HOME_TEXT_BUTTON_ADD_ITEM}
                    </Button>
                    <Button
                      variant='primary'
                      onClick={this.handleUpload}
                      disabled={!online}
                      sx={{
                        ':disabled': {
                          backgroundColor: colors.lines,
                        }
                      }}
                    >
                      {textContent.HOME_TEXT_BUTTON_UPLOAD_LIST}
                    </Button>
                  </Box>
                </Flex>
              )
            }}
          />
        <TaskList taskList={taskList} />
      </Frame>
    )
  }
}

const mapStateToProps = (state) => ({
  user: UserSelector.selectData(state),
  userList: UserSelector.selectUsers(state),
  modalTaskOpened: AppSelector.selectModalTaskOpened(state),
  modalTaskDetailOpened: AppSelector.selectModalTaskDetailOpened(state),
  taskDetail: AppSelector.selectTaskDetail(state),
  taskList: AppSelector.selectTaskList(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (route) => push(route),
  handleTaskListSave: taskList => AppActions.TaskListSave(taskList),
  handleModalTaskOpen: (open, task) => AppActions.ModalTaskOpen(open, task),
  handleModalCloseAll: () => AppActions.ModalTaskCloseAll()
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Index)
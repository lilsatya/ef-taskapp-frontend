import React, { memo } from 'react'
import { Box, Button } from 'rebass'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Model, { InitialValues } from '../../Models/Tasks'
import { DB_TASKS } from '../../Config/db-names'
import { selector as UserSelector } from '../../Redux/user'

// Components
import Frame from '../../Components/Frame'
import TaskModalAdd from '../../Components/TaskModalAdd'
import TaskList from '../../Components/TaskList'

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

class Index extends React.PureComponent {
  state = {
    unsub: null, // using state because using direct object isn't working
    date: new Date(),
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
    this.setState({ date: new Date() })
  }

  handleSubmit = async values => {
    const { user } = this.props
    const { title, assignee, description, status, dueDate, tags } = values

    try {
      await Model.addItem({
        title,
        assignee: JSON.parse(assignee), // option only limited to string and numbers, so i did stringify + parse
        reporter: user,
        description,
        status,
        dueDate,
        tags
      })

      this.setState({ taskAddOpened: false })
    } catch (err) {
      console.log(err)
    }
  }

  handleUpload = async () => {
    await Model.upload()
  }

  handleModalClose = () => {
    this.setState({
      taskAddOpened: false,
      taskDetailOpened: false
    })
  }

  render() {
    const { changePage, user, userList } = this.props
    const { date, values, loading, taskAddOpened, tagList } = this.state

    return (
      <Frame loading={loading}>
        <TaskModalAdd
          opened={taskAddOpened}
          initialValues={InitialValues}
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          userList={userList}
          tagList={tagList}
          values={values}
        />
        <Box
          width={1}
        >
          <h3>Welcome, {user.username}!</h3>
          <p>{date.toString()}</p>
        </Box>
        <Box
          width={1}
        >
          <Button
            variant='primary'
            mr={2}
            onClick={() => this.setState({ taskAddOpened: true })}
          >
            Add Item
          </Button>
          <Button
            variant='primary'
            onClick={this.handleUpload}
          >
            Upload List
          </Button>
          <TaskList taskList={Model.data} />
        </Box>
      </Frame>
    )
  }
}

const mapStateToProps = (state) => ({
  user: UserSelector.selectData(state),
  userList: UserSelector.selectUsers(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (route) => push(route)
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Index)
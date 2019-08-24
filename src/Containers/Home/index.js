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

class Index extends React.PureComponent {
  state = {
    unsub: null, // using state because using direct object isn't working
    date: new Date(),
    loading: false,
    taskAddOpened: false,
    taskDetailOpened: false
  }

  async componentDidMount() {
    this.setState({
      unsub: await Model.subscribe(this.handleUpdate),
      loading: true
    })
  }

  async componentDidUpdate() {
    if (!Model.isInitialized) {
      Model.setName(DB_TASKS)	// to set databasename for model
      await Model.initialize() // to initialize database locally by getting synced
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

  handleSubmit = async (values, actions) => {
    console.log(values)
    console.log(actions)
    // await Model.addItem({
    //   task: 'asd',
    //   description: 'ypooo'
    // });
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
    const { date, values, loading, taskAddOpened } = this.state

    return (
      <Frame loading={loading}>
        <TaskModalAdd
          opened={taskAddOpened}
          initialValues={InitialValues}
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          userList={userList}
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
            Upload
          </Button>
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
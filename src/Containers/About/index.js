import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const index = props => (
  <div>
    <h1>about</h1>
    <p>Welcome tp about!</p>
    <button onClick={() => props.changePage()}>Go to home page via redux</button>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(index)
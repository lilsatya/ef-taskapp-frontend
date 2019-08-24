import React, { Component } from 'react'

export default function asyncRoutes(importComponent) {
  class AsyncRoute extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null,
      }
    }
    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }
    render() {
      const Comp = this.state.component
      return Comp ? <Comp { ...this.props } /> : null
    }
  }

  return AsyncRoute
}

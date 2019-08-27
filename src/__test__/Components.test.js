import React from 'react'
import ReactDOM from 'react-dom'
import Frame from '../Components/Frame'
import Header from '../Components/Header'
import TagInput from '../Components/TagInput'
import TaskCard from '../Components/TaskCard'
import TaskList from '../Components/TaskList'
import TaskListSingle from '../Components/TaskListSingle'
import TaskModalAdd from '../Components/TaskModalAdd'

it('Frame renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Frame />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Frame renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Frame />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TagInput renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TagInput />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TaskCard renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskCard />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TaskList renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskList />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TaskListSingle renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskListSingle />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('TaskModalAdd renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskModalAdd />, div)
  ReactDOM.unmountComponentAtNode(div)
})

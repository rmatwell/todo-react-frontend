import React from 'react'
import { Link } from 'react-router-dom'

export default class NavLink extends React.Component {
  render() {
    return <Link {...this.props} activeClassName="active" />
  }
}
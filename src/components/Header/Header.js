import React from 'react'
import './Header.scss'
import Tab from '../Tab/Tab.js'

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="icon-wrapper">
          <i className="icon-menu" />
          <div className="icon-middle">
            <i className="icon-music" />
            <i className="icon-wangyi" />
            <i className="icon-friend" />
          </div>
          <i className="icon-search" />
        </div>
        <Tab />
      </div>
    )
  }
}

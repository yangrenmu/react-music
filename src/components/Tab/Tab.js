import React from 'react'
import { NavLink} from 'react-router-dom'
import './Tab.scss'

export default class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bottomClassName : 'border-bottom'
    }
  }
  moveBottom(type) {
    let name = 'border-bottom ' + type
    this.setState({
      bottomClassName: name
    })
  }

  render() {
    let bottomClassName = this.state.bottomClassName
    // console.log(bottomClassName)
    return (
        <div className="tab">
          <div className="tab-wrapper">
            <NavLink
              to="/recommends"
              className="tab-item"
              activeClassName="selected"
              onClick={() => this.moveBottom('recomends')}
            >
              个性推荐
            </NavLink>
            <NavLink
              to="/songs"
              className="tab-item"
              activeClassName="selected"
              onClick={() => this.moveBottom('songs')}
            >
              歌单
            </NavLink>
            <NavLink
              to="/radios"
              className="tab-item"
              activeClassName="selected"
              onClick={() => this.moveBottom('radios')}
            >
              主播电台
            </NavLink>
            <NavLink
              to="/rankings"
              className="tab-item"
              activeClassName="selected"
              onClick={() => this.moveBottom('rankings')}
            >
              排行榜
            </NavLink>
          </div>
          <span className={bottomClassName} />
        </div>
      
    )
  }
}

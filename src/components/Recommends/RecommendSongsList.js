import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {musicListIdAction, musicIdAction} from '../../redux/Action/Actions.js'
import './RecommendSongsList.scss'

import axios from 'axios'

class RecommendSongsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playLists: []
    }
    this.showPlayList = this.showPlayList.bind(this)
  }

  showPlayList(id) {
    console.log(id)
    this.props.dispatchAction(musicListIdAction(id))
  }

  componentDidMount() {
    axios.get('http://localhost:5000/personalized').then(Res => {
      let res = Res.data.result.slice(0, 6)
      // console.log(res)
      this.setState({ playLists: res })
    })
  }

  render() {
    const PlayLists = this.state.playLists.map((items, index) => {
      let count = items.playCount
      function formatCount(value) {
        if (value < 10000) {
          return value
        } else if (value >= 10000 && value < 100000000) {
          return (value / 10000).toFixed(0) + '万'
        } else if (value >= 100000000) {
          return (value / 100000000).toFixed(1) + '亿'
        }
      }
      const playCount = formatCount(count)
      return (
        <div key={index} className="cover-wrapper">
          <Link to="/album" onClick={()=>this.showPlayList(items.id)}>
            <img className="image" src={items.picUrl} alt="" />
            <div className="icon-wrapper">
              <i className="icon-headset" />
              <span className="count">{playCount}</span>
            </div>
            <div className="text-wrapper">
              <span className="text">{items.name}</span>
            </div>
          </Link>
        </div>
      )
    })
    return <div>{PlayLists}</div>
  }
}

const mapStateToProps = state => {
  return {
    musicListIds: state.musicListId,
    musicIds: state.musicId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchAction: action => dispatch(action)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendSongsList)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { musicListIdAction } from '../../redux/Action/Actions.js'
import './RecommendSongsList.scss'

class RecommendSongsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playLists: []
    }
    this.showPlayList = this.showPlayList.bind(this)
  }

  showPlayList(id) {
    const { dispatchAction } = this.props
    dispatchAction(musicListIdAction(id))
  }

  componentDidMount() {
    axios.get('http://192.168.102.74:5000/personalized').then((Res) => {
      const res = Res.data.result.slice(0, 6)
      // console.log(res)
      this.setState({ playLists: res })
    })
  }

  render() {
    const { playLists } = this.state
    const PlayLists = playLists.map((items, index) => {
      const count = items.playCount
      function formatCount(value) {
        if (value < 10000) {
          return value
        } if (value >= 10000 && value < 100000000) {
          return `${(value / 10000).toFixed(0)}万`
        } if (value >= 100000000) {
          return `${(value / 100000000).toFixed(1)}亿`
        }
        return 0
      }
      const playCount = formatCount(count)
      return (
        <div key={index} className="cover-wrapper">
          <Link to="/album" onClick={() => this.showPlayList(items.id)}>
            <img className="image" src={items.picUrl} alt="" />
            <div className="icon-wrapper">
              <i className="icon-headset" />
              <span className="count">
                {playCount}
              </span>
            </div>
            <div className="text-wrapper">
              <span className="text">
                {items.name}
              </span>
            </div>
          </Link>
        </div>
      )
    })
    return (
      <div>
        {PlayLists}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musicListIds: state.musicListId
})
const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendSongsList)

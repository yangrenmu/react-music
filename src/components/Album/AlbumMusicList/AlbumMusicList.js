import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { musicIdAction } from '../../../redux/Action/Actions.js'
import './AlbumMusicList.scss'

class AlbumMusicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackCount: 0,
      tracks: []
    }
  }

  componentDidMount() {
    const musicListId = localStorage.getItem('musicListId')
    axios
      .get(`http://192.168.102.74:5000/playlist/detail?id=${musicListId}`)
      .then((res) => {
        const { playlist } = res.data
        this.setState({
          trackCount: playlist.trackCount,
          tracks: playlist.tracks
        })
      })
  }

  playMusic(id) {
    const { dispatchAction } = this.props
    dispatchAction(musicIdAction(id))
  }

  render() {
    const { tracks, trackCount } = this.state
    const track = tracks.map((items, index) => (
      <div className="tracks" key={index}>
        <span className="index">
          {index + 1}
        </span>
        <Link
          to="/album/play"
          onClick={() => this.playMusic(items.id)}
          className="tracks-info"
        >
          <div className="info">
            <span className="tracks-name">
              {items.name}
            </span>
            <span className="singer-name">
              {`${items.ar[0].name}-${items.al.name}`}
            </span>
          </div>
          <i className="icon-omit" />
        </Link>
      </div>
    ))
    return (
      <div className="music-list">
        <div className="play-all">
          <div className="play">
            <i className="icon-pause" />
            <span className="text">
              {'播放全部'}
            </span>
            <span className="track-count">
              {`(共${trackCount}首)`}
            </span>
          </div>
          <div className="choices">
            <i className="icon-choices" />
            <span className="text">
              {'多选'}
            </span>
          </div>
        </div>
        {track}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musicIds: state.musicId
})

const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action)
})

// export default AlbumMusicList
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumMusicList)

import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { playStateAction, showPlayMusicAction } from '../../redux/Action/Actions.js'
import './MiniPlay.scss'

class MiniPlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: {
        name: '',
        al: {
          picUrl: ''
        },
        ar: [{ name: '' }]
      },
      playStateClassName: true
    }
    this.refAudio = React.createRef()
  }

  componentDidMount() {
    const localMusicId = localStorage.getItem('musicId')
    axios
      .get(`http://192.168.102.74:5000/song/detail?ids=${localMusicId}`)
      .then((res) => {
        this.setState({
          songs: res.data.songs[0]
        })
      })
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps)
  //   console.log(prevState)
  //   // console.log(nextProps)
  //   const localMusicId = localStorage.getItem('musicId')
  //   axios
  //     .get(`http://192.168.102.74:5000/song/detail?ids=${localMusicId}`)
  //     .then((res) => {
  //       this.setState({
  //         songs: res.data.songs[0]
  //       })
  //     })
  //   return this.state
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const localMusicId = localStorage.getItem('musicId')
    axios
      .get(`http://192.168.102.74:5000/song/detail?ids=${localMusicId}`)
      .then((res) => {
        this.setState({
          songs: res.data.songs[0]
        })
      })
  }

  showPlayMusic() {
    // const { dispatchAction } = this.props
    // dispatchAction(showPlayMusicAction(true))
    // dispatchAction(musicIdAction(id))
    // dispatchAction(currentIndexAction(currentIndex))
  }


  playControl() {
    const { dispatchAction, playState } = this.props
    const audio = document.getElementById('audio')
    console.log(audio)
    if (playState === 'playing') {
      // this.refAudio.current.pause()
      audio.pause()
      this.setState({
        playStateClassName: false
      })
      dispatchAction(playStateAction('pause'))
    } else if (playState === 'pause') {
      // this.refAudio.current.play()
      audio.play()
      this.setState({
        playStateClassName: true
      })
      dispatchAction(playStateAction('playing'))
    }
  }

  render() {
    const { songs, playStateClassName } = this.state
    return (
      <div className="mini-play">
        <img className="image" src={songs.al.picUrl} alt="" />
        <div onClick={() => this.showPlayMusic()} className="music-info">
          <span className="song-name">
            {songs.name}
          </span>
          <span className="singer-name">
            {songs.ar[0].name}
          </span>
        </div>
        <div className="icon-wrapper">
          <i onClick={() => this.playControl()} className={playStateClassName ? 'icon-play' : 'icon-pause'} />
          <i className="icon-list" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musicId: state.musicIds.musicId,
  album: state.albums.album,
  currentIndex: state.updateIndexs.currentIndex,
  playState: state.playStates.playState
})
const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlay)

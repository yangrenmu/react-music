import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  currentIndexAction,
  playStateAction,
  showPlayMusicAction,
  musicIdAction
} from '../../redux/Action/Actions.js'
import MiniPlay from '../MiniPlay/MiniPlay.js'
import './PlayMusic.scss'
import recordImg from '../../static/image/record.png'
import microphoneImg from '../../static/image/microphone.png'

function addZero(value) {
  return value < 10 ? `0${value}` : value
}

class PlayMusic extends React.Component {
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
      currentTime: '00:00',
      totalTime: '00:00',
      musicUrl: '',
      playStateClassName: true,
      coverClassName: '',
      microphoneClassName: 'microphonePlay'
    }
    this.refAudio = React.createRef()
    this.refCurrentBar = React.createRef()
    this.refDot = React.createRef()
  }

  componentDidMount() {
    console.log(`${this.props}123`)
    // 将传入的 musicId、album、currentIndex 存入到 localStorage 中
    const { musicId, album, currentIndex } = this.props
    if (musicId && currentIndex >= 0) {
      localStorage.setItem('musicId', musicId)
      localStorage.setItem('currentIndex', currentIndex)
    }
    if (JSON.stringify(album) !== '{}') {
      localStorage.setItem('album', JSON.stringify(album))
    }
    const localMusicId = localStorage.getItem('musicId')
    if (localMusicId) {
      this.get(localMusicId)
    }

    this.timer = setInterval(() => {
      // 更新当前播放时间
      const currentTimes = Math.round(this.refAudio.current.currentTime)
      const totalTimes = Math.round(this.refAudio.current.duration)
      const currentMinute = addZero(Math.floor(currentTimes / 60))
      const currentSecond = addZero(currentTimes % 60)
      this.setState({
        currentTime: `${currentMinute}:${currentSecond}`
      })
      // 更新进度条
      const barStyle = `${((currentTimes / totalTimes) * 100).toFixed(2)}80%`
      this.refCurrentBar.current.style.width = barStyle
      this.refDot.current.style.left = barStyle
    }, 300)
  }

  // shouldComponentUpdate() {
  //   return true
  // }
  componentWillReceiveProps(nextProps, prevState) {
    console.log(nextProps)
    if (nextProps.musicId && nextProps.currentIndex >= 0) {
      localStorage.setItem('musicId', nextProps.musicId)
      localStorage.setItem('currentIndex', nextProps.currentIndex)
    }
    if (JSON.stringify(nextProps.album) !== '{}') {
      localStorage.setItem('album', JSON.stringify(nextProps.album))
    }
    const music = nextProps.album[nextProps.currentIndex]
    this.get(music.id)
    if (nextProps.playState === 'playing') {
      this.setState({
        playStateClassName: false,
        coverClassName: 'cover-pause',
        microphoneClassName: ''
      })
    } else if (nextProps.playState === 'pause') {
      this.refAudio.current.play()
      this.setState({
        playStateClassName: true,
        coverClassName: '',
        microphoneClassName: 'microphonePlay'
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  controlPlay() {
    const { dispatchAction, playState } = this.props
    if (playState === 'playing') {
      this.refAudio.current.pause()
      this.setState({
        playStateClassName: false,
        coverClassName: 'cover-pause',
        microphoneClassName: ''
      })
      dispatchAction(playStateAction('pause'))
    } else if (playState === 'pause') {
      this.refAudio.current.play()
      this.setState({
        playStateClassName: true,
        coverClassName: '',
        microphoneClassName: 'microphonePlay'
      })
      dispatchAction(playStateAction('playing'))
    }
  }

  playNextPre(index) {
    const { dispatchAction } = this.props

    // 读取 localstorage 中的 album、currentIndex
    const localAlbum = JSON.parse(localStorage.getItem('album'))
    let localCurrentIndex = JSON.parse(localStorage.getItem('currentIndex'))

    // 根据传入的index来控制播放顺序。(-1：上一首、1：下一首)
    localCurrentIndex = (localCurrentIndex + index + localAlbum.length) % localAlbum.length
    const music = localAlbum[localCurrentIndex]

    // 更新 localStorage 中 musicID 和 currentIndex 的值
    localStorage.setItem('musicId', music.id)
    localStorage.setItem('currentIndex', localCurrentIndex)
    this.get(music.id)
    dispatchAction(musicIdAction(music.id))
    dispatchAction(currentIndexAction(localCurrentIndex))
  }

  backClick() {
    // const { history } = this.props
    // history.goBack()
    const { dispatchAction } = this.props
    dispatchAction(showPlayMusicAction(false))
  }

  get(localMusicId) {
    axios
      .get(`http://192.168.102.74:5000/song/detail?ids=${localMusicId}`)
      .then((res) => {
        // console.log(res)
        this.setState({
          songs: res.data.songs[0]
        })
      })
    axios
      .get(`http://192.168.102.74:5000/music/url?id=${localMusicId}`)
      .then((res) => {
        console.log(localMusicId)
        const musicInfo = res.data.data[0]
        if (musicInfo) {
          const duration = Math.round((musicInfo.size * 8) / musicInfo.br)
          const totalMinute = addZero(Math.floor(duration / 60))
          const totalSecond = addZero(duration % 60)
          this.setState({
            totalTime: `${totalMinute}:${totalSecond}`
          })
        }
        this.setState({
          musicUrl: musicInfo.url
        })
      })
  }


  render() {
    // console.log(this.props.musicId, '------------')
    const {
      songs,
      currentTime,
      totalTime,
      musicUrl,
      playStateClassName,
      coverClassName,
      microphoneClassName
    } = this.state

    const styles = {
      backgroundImage: `url(${recordImg})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
    const { showPlayMusic } = this.props
    let playMusicClassName = ''
    if (showPlayMusic) {
      playMusicClassName = 'show-play-music'
    } else {
      playMusicClassName = 'hide-play-music'
    }

    return (
      <div>
        <div className={`play-music-wrapper ${playMusicClassName}`}>
          <div className="play-music">
            <div className="background">
              <div className="mask" />
              <div className="mask1" />
              <div className="image-wrapper">
                <img className="image" src={songs.al.picUrl} alt="" />
              </div>
            </div>

            <section className="header">
              <i onClick={() => this.backClick()} className="icon-back" />
              <div className="title">
                <span className="songs-name-text">
                  {songs.name}
                </span>
                <span className="singer-name">
                  {songs.ar[0].name}
                </span>
              </div>
              <i className="icon-share" />
            </section>

            <section className="jukebox">
              <div className="record-wrapper">
                <img className={`microphone ${microphoneClassName}`} src={microphoneImg} alt="" />
                <div className="record-content">
                  <div className="record" style={styles} />
                  <img className={`cover ${coverClassName}`} src={songs.al.picUrl} alt="" />
                </div>
              </div>
            </section>

            <section className="play-wrapper">
              <div className="icon-wrapper">
                <i className="icon-enshrine" />
                <i className="icon-download" />
                <i className="icon-comment" />
                <i className="icon-omit" />
              </div>
              <div className="progress">
                <span className="current-time">
                  {currentTime}
                </span>
                <div className="line">
                  <span className="total-bar" />
                  <span ref={this.refCurrentBar} className="current-bar" />
                  <span ref={this.refDot} className="dot" />
                </div>
                <span className="total-time">
                  {totalTime}
                </span>
              </div>
              <div className="play-control">
                <i className="icon-circulation" />
                <div className="control">
                  <i onClick={() => this.playNextPre(-1)} className="icon-pre" />
                  <i
                    onClick={() => this.controlPlay()}
                    className={playStateClassName ? 'icon-play' : 'icon-pause'}
                  />
                  <i onClick={() => this.playNextPre(1)} className="icon-next" />
                </div>
                <i className="icon-list" />
              </div>
            </section>

            <section>
              <audio id="audio" ref={this.refAudio} autoPlay src={musicUrl} />
            </section>
          </div>
        </div>
        <MiniPlay />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musicId: state.musicIds.musicId,
  playState: state.playStates.playState,
  album: state.albums.album,
  currentIndex: state.updateIndexs.currentIndex,
  showPlayMusic: state.showPlayMusics.showPlayMusic
})
const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMusic)

import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './PlayMusic.scss'
import recordImg from '../../static/image/record.png'
import microphoneImg from '../../static/image/microphone.png'


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
      musicUrl: ''
    }
    this.refAudio = React.createRef()
  }

  componentDidMount() {
    const { musicId } = this.props
    if (musicId) {
      localStorage.setItem('musicId', musicId)
    }
    const localMusicId = localStorage.getItem('musicId')
    if (localMusicId) {
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
          const musicInfo = res.data.data[0]
          // const totalTime = (musicInfo.size * 8) / musicInfo.br
          // console.log(musicInfo)
          this.setState({
            musicUrl: musicInfo.url
          })
        })
    }
  }

  controlPlay() {
    this.refAudio.current.pause()
  }

  render() {
    // console.log(this.props.musicId)
    const {
      songs, currentTime, totalTime, musicUrl
    } = this.state
    const styles = {
      backgroundImage: `url(${recordImg})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div className="play-music">
        <div className="background">
          <div className="mask" />
          <div className="mask1" />
          <div className="image-wrapper">
            <img className="image" src={songs.al.picUrl} alt="" />
          </div>
        </div>

        <section className="header">
          <i className="icon-back" />
          <div className="title">
            <div className="songs-name">
              <span className="songs-name-text">
                {songs.name}
              </span>
            </div>
            <span className="singer-name">
              {songs.ar[0].name}
            </span>
          </div>
          <i className="icon-share" />
        </section>

        <section className="jukebox">
          <div className="record-wrapper">
            <img
              className="microphone"
              src={microphoneImg}
              alt=""
            />
            <div className="record-content">
              <div className="record" style={styles} />
              <img className="cover" src={songs.al.picUrl} alt="" />
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
              <span className="current-bar" />
              <span className="dot" />
            </div>
            <span className="total-time">
              {totalTime}
            </span>
          </div>
          <div className="play-control">
            <i className="icon-circulation" />
            <div className="control">
              <i className="icon-pre" />
              <i onClick={() => this.controlPlay()} className="icon-play" />
              <i className="icon-next" />
            </div>
            <i className="icon-list" />
          </div>
        </section>
        <audio
          ref={this.refAudio}
          autoPlay
          src={musicUrl}
        />
      </div>

    )
  }
}

const mapStateToProps = state => ({
  musicId: state.musicIds.musicId
  // playState: state.controlPlay.playState
})
const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMusic)

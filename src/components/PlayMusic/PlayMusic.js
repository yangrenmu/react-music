import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './PlayMusic.scss'

class PlayMusic extends React.Component {
  constructor(props) {
    super(props)
    this.refAudio = React.createRef()
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
  }
  componentDidMount() {
    if (this.props.musicId) {
      localStorage.setItem('musicId', this.props.musicId)
    }
    const musicId = localStorage.getItem('musicId')
    axios
      .get('http://192.168.102.74:5000/song/detail?ids=' + musicId)
      .then(res => {
        console.log(res)
        this.setState({
          songs: res.data.songs[0]
        })
      })
    axios
      .get('http://192.168.102.74:5000/music/url?id=' + musicId)
      .then(res => {
        const musicInfo = res.data.data[0]
        const totalTime = (musicInfo.size * 8) / musicInfo.br
        console.log(musicInfo)
        this.setState({
          musicUrl: musicInfo.url
        })
      })
      console.log(this.refAudio.current)
      this.refAudio.current.play()
  }

  render() {
    console.log(this.props.musicId)
    const styles = {
      backgroundImage: `url(${require('../../static/image/record.png')})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
    
    return (
      <div className="play-music">
        <div className="background">
          <div className="mask" />
          <div className="mask1" />
          <div className="image-wrapper">
            <img className="image" src={this.state.songs.al.picUrl} alt="" />
          </div>
        </div>
        <section className="header">
          <i className="icon-back" />
          <div className="title">
            <div className="songs-name">
              <span className="songs-name-text">{this.state.songs.name}</span>
            </div>
            <span className="singer-name">{this.state.songs.ar[0].name}</span>
          </div>
          <i className="icon-share" />
        </section>
        <section className="jukebox">
          <div className="record-wrapper">
            <img
              className="microphone"
              src={require('../../static/image/microphone.png')}
              alt=""
            />
            <div className="record-content">
              <div className="record" style={styles} />
              <img className="cover" src={this.state.songs.al.picUrl} alt="" />
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
            <span className="current-time">{this.state.currentTime}</span>
            <div className="line">
              <span className="total-bar" />
              <span className="current-bar" />
              <span className="dot" />
            </div>
            <span className="total-time">{this.state.totalTime}</span>
          </div>
          <div className="play-control">
            <i className="icon-circulation" />
            <div className="control">
              <i className="icon-pre" />
              <i className="icon-play" />
              <i className="icon-next" />
            </div>
            <i className="icon-list" />
          </div>
        </section>
        <audio ref={this.refAudio} src={this.state.musicUrl}></audio>
      </div>
    )
  }
}

// export default PlayMusic
export default connect(state => {
  return {
    musicId: state.musicIds.musicId
  }
})(PlayMusic)

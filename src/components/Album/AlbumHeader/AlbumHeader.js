import React from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import './AlbumHeader.scss'

class AlbumHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      description: '',
      coverImg: '',
      playCount: 0,
      name: '',
      avatar: '',
      nickname: '',
      subscribedCount: 0,
      commentCount: 0,
      shareCount: 0
    }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    const { musicListId } = this.props
    if (musicListId) {
      localStorage.setItem('musicListId', musicListId)
    }
    const localMusicListId = localStorage.getItem('musicListId')
    axios
      .get(`http://192.168.102.74:5000/playlist/detail?id=${localMusicListId}`)
      .then((res) => {
        const { playlist } = res.data
        this.setState({
          description: playlist.description.split('。')[0],
          coverImg: playlist.coverImgUrl,
          playCount: playlist.playCount,
          name: playlist.name,
          avatar: playlist.creator.avatarUrl,
          nickname: playlist.creator.nickname,
          subscribedCount: playlist.subscribedCount,
          commentCount: playlist.commentCount,
          shareCount: playlist.shareCount
        })
      })
  }

  back() {
    const { history } = this.props
    history.goBack()
  }

  render() {
    // const playlist = this.state.playlist
    const {
      description, coverImg, playCount, name, avatar, nickname, subscribedCount, commentCount, shareCount
    } = this.state
    // const text = this.state.description
    // console.log(text)
    return (
      <div className="AlbumHeader">
        <section className="header">
          <div className="header-back">
            <i className="icon-back" onClick={this.backClick} />
            <div className="text-wrapper">
              <div className="text">
                <span>
                  歌单
                </span>
              </div>
              <div className="editor">
                <span className="editor-text">
                  编辑推荐：
                </span>
                <span className="move-text">
                  {description}
                </span>
              </div>
            </div>
          </div>
          <div className="search-wrapper">
            <div className="search" />
            <i className="icon-omit" />
          </div>
        </section>
        <section className="cover-section">
          <div className="mask" />
          <div className="mask1" />
          <div className="background">
            <img className="image" src={coverImg} alt="" />
          </div>
          <div className="cover">
            <div className="cover-info">
              <img className="image" src={coverImg} alt="" />
              <div className="playCount">
                <i className="icon-headset" />
                <span className="count">
                  {playCount > 9999
                    ? `${(playCount / 10000).toFixed(0)}万`
                    : playCount}
                </span>
              </div>
            </div>
            <div className="user-info">
              <span className="list-info">
                {name}
              </span>
              <div className="user-info">
                <img className="image" src={avatar} alt="" />
                <span className="usernick">
                  {nickname}
                </span>
                <i className="icon-exceed" />
              </div>
            </div>
          </div>
          <div className="icon-wrapper">
            <div className="collect bottom">
              <i className="icon-collect icon" />
              <span className="text">
                {subscribedCount}
              </span>
            </div>
            <div className="discuss bottom">
              <i className="icon-comment icon" />
              <span className="text">
                {commentCount}
              </span>
            </div>
            <div className="share bottom">
              <i className="icon-share icon" />
              <span className="text">
                {shareCount}
              </span>
            </div>
            <div className="download bottom">
              <i className="icon-download icon" />
              <span className="text">
                下载
              </span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// export default AlbumHeader
export default connect(state => ({
  musicListId: state.musicListIds.musicListId
}))(AlbumHeader)

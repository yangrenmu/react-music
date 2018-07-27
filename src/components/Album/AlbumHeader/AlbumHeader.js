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
  }

  componentDidMount() {
    if (this.props.musicListId) {
      localStorage.setItem('musicListId', this.props.musicListId)
    }
    const musicListId = localStorage.getItem('musicListId')
    console.log(musicListId)
    axios
      .get('http://localhost:5000/playlist/detail?id=' + musicListId)
      .then(res => {
        // console.log(res.data.playlist)
        const playlist = res.data.playlist
        const creator = playlist.creator
        this.setState({
          description: playlist.description.split('。')[0],
          coverImg: playlist.coverImgUrl,
          playCount: playlist.playCount,
          name: playlist.name,
          avatar: creator.avatarUrl,
          nickname: creator.nickname,
          subscribedCount: playlist.subscribedCount,
          commentCount: playlist.commentCount,
          shareCount: playlist.shareCount
        })
      })
  }

  render() {
    console.log(this.state.playlist)
    // const playlist = this.state.playlist
    const text = this.state.description
    // console.log(text)
    return (
      <div className="AlbumHeader">
        <section className="header">
          <div className="header-back">
            <i className="icon-back" />
            <div className="text-wrapper">
              <div className="text">歌单</div>
              <div className="editor">
                <span className="editor-text">编辑推荐：</span>
                <span className="move-text">{text}</span>
              </div>
            </div>
          </div>
          <div className="search-wrapper">
            <div className="search" />
            <i className="icon-omit" />
          </div>
        </section>
        <section className="cover">
          <div className="mask" />
          <div className="background">
            <img className="image" src={this.state.coverImg} alt="" />
          </div>
          <div className="cover-info">
            <img className="image" src={this.state.coverImg} alt="" />
            <div className="playCount">
              <i className="icon-headset" />
              <span className="count">
                {this.state.playCount > 9999
                  ? (this.state.playCount / 10000).toFixed(0) + '万'
                  : this.state.playCount}
              </span>
            </div>
          </div>
          <div className="user-info">
            <span className="list-info">{this.state.name}</span>
            <div className="user-info">
              <img className="image" src={this.state.avatar} alt="" />
              <span className="usernick">{this.state.nickname}</span>
              <i className="icon-exceed" />
            </div>
          </div>
        </section>
        <section>
          <div className="icon-wrapper">
            <div className="collect bottom">
              <i className="icon-collect icon" />
              <span className="text">{this.state.subscribedCount}</span>
            </div>
            <div className="discuss bottom">
              <i className="icon-comment icon" />
              <span className="text">{this.state.commentCount}</span>
            </div>
            <div className="share bottom">
              <i className="icon-share icon" />
              <span className="text">{this.state.shareCount}</span>
            </div>
            <div className="download bottom">
              <i className="icon-download icon" />
              <span className="text">下载</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// export default AlbumHeader
export default connect(state => {
  // console.log(state)
  return {
    musicListId: state.musicListIds.musicListId
  }
})(AlbumHeader)

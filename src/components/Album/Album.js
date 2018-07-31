import React from 'react'
import AlbumHeader from './AlbumHeader/AlbumHeader.js'
import AlbumMusicList from './AlbumMusicList/AlbumMusicList.js'
import './Album.scss'

class Album extends React.Component {
  render() {
    // console.log(this.props)
    const { history } = this.props

    return (
      <div className="album">
        <AlbumHeader history={history} />
        <AlbumMusicList />
      </div>
    )
  }
}

export default Album

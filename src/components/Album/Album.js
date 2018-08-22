import React from 'react'
import AlbumHeader from './AlbumHeader/AlbumHeader.js'
import AlbumMusicList from './AlbumMusicList/AlbumMusicList.js'
// import MiniPlay from '../MiniPlay/MiniPlay.js'
import './Album.scss'

class Album extends React.Component {
  componentDidMount() {
    console.log('3')
  }

  render() {
    // console.log(this.props)
    const { history } = this.props

    return (
      <div className="album">
        <AlbumHeader history={history} />
        <AlbumMusicList />
        {/* <MiniPlay /> */}
      </div>
    )
  }
}

export default Album

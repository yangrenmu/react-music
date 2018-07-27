import React from 'react'
import AlbumHeader from './AlbumHeader/AlbumHeader.js'
import './Album.scss'

class Album extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  
  render() {
    const data = this.state.data
    // console.log(data)
    return (
      <div className="album">
        <AlbumHeader />
      </div>
    )
  }
}

export default Album

// export default connect(state => {
//   // console.log(state)
//   return {
//     musicListId: state.musicListIds.musicListId
//   }
// })(Album)

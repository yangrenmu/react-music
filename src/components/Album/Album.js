import React from 'react'
import { connect } from 'react-redux'
import './Album.scss'

class Album extends React.Component {
  render() {
    const musicListId = this.props.musicListId
    console.log(this.props)
    return <div className="album">{musicListId + '-' + this.props.musicId}</div>
  }
}

export default connect(state => {
  console.log(state)
  return {
    musicListId: state.musicListIds.musicListId,
    musicId: state.musicIds.musicId
  }
})(Album)

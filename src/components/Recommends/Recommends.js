import React from 'react'
import Carousel from '../Carousel/Carousel.js'
import RecommendSongsList from './RecommendSongsList.js'
import RecommendExclusive from './RecommendExclusive.js'
import './Recommends.scss'

class Recommends extends React.Component {

  render() {
    return (
      <div>
        <Carousel />
        <div className="recommend-songs">
          <div className="recommend-songs-header">
            <span className="recommend-songs-text">推荐歌单</span>
            <i className="icon-exceed"/>
          </div>
          <div className="recommend-songs-list">
            <div><RecommendSongsList/></div>
          </div>
          <div className="recommend-songs-header">
            <span className="recommend-songs-text">独家放送</span>
            <i className="icon-exceed"/>
          </div>
          <RecommendExclusive/>
        </div>
      </div>
    )
  }
}

export default Recommends

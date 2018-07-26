import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import './RecommendExclusive.scss'

class RecommendExclusive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exclusive: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/personalized/privatecontent').then(res => {
      // console.log(res)
      this.setState({
        exclusive: res.data.result
      })
    })
  }
  showMusicMenu() {}
  render() {
    const exclusive = this.state.exclusive.map((item, index) => {
      if (index > 0) {
        return (
          <div
            key={index}
            onClick={() => this.showMusicMenu()}
            className="content"
          >
            <div className="image-wrapper">
              <img className="image" src={item.picUrl} alt="" />
            </div>
            <i className="icon-dynamicPlay" />
            <span className="text">{item.name}</span>
          </div>
        )
      }
    })
    return <div className="recommend-exclusive">{exclusive}</div>
  }
}
export default RecommendExclusive

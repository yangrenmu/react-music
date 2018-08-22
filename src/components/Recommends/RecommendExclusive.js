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
    axios.get('http://localhost:5000/personalized/privatecontent').then((res) => {
      // console.log(res)
      this.setState({
        exclusive: res.data.result
      })
    })
  }

  render() {
    const { exclusive } = this.state
    const exclusives = exclusive.map((item, index) => {
      if (index > 0) {
        return (
          <div
            key={index}
            className="content"
          >
            <div className="image-wrapper">
              <img className="image" src={item.picUrl} alt="" />
            </div>
            <i className="icon-dynamicPlay" />
            <span className="text">
              {item.name}
            </span>
          </div>
        )
      }
      return (
        <div key={index}/>
      )
    })
    return (
      <div className="recommend-exclusive">
        {exclusives}
      </div>
    )
  }
}
export default RecommendExclusive

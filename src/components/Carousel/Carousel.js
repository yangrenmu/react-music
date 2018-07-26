import React from 'react'
import Slider from 'react-slick'
import './Carousel.scss'

export default class Carousel extends React.Component {
  
  render() {
    let settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      lazyLoad: true
    }
    return (
      <div className="slider-wrap">
        <Slider {...settings} className="slider">
          <div className="slider-content">
            <img
              className="image"
              src="http://p1.music.126.net/GWBb_2F-QCkQBSp7H3aX6Q==/109951163417091743.jpg"
              alt=""
            />
          </div>
          <div className="slider-content">
            <img
              className="image"
              src="http://p1.music.126.net/8FxRlB7-QwqWY1sgW8QNfw==/109951163420710781.jpg"
              alt=""
            />
          </div>
          <div className="slider-content">
            <img
              className="image"
              src="http://p1.music.126.net/D7nofuxKw4msWRaqGMooBw==/109951163420715045.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
    )
  }
}

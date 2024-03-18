import React from 'react';
import Slider from 'react-slick';
import ProfileCard from './ProfileCard';
import './Carousel.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ recommendedUsers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear"
  };

  return (
    <div className='slider'>

    <Slider {...settings}>
      {recommendedUsers.map((user, index) => (
          <div key={index}>
          <ProfileCard user={user} />
        </div>
      ))}
    </Slider>
      </div>
  );
};

export default Carousel;

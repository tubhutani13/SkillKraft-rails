import React from "react";
import Slider from "react-slick";
import ProfileCard from "./ProfileCard";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ recommendedUsers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div className="slider">
      <h2>Recommended Mentors</h2>
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

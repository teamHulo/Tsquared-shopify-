$(document).ready(function(){

  //   var autoPlay = window.innerWidth > 767 ? false : true;

  // console.log(autoPlay, "-->");

    $('.image-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
      nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
      centerMode: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 1500,
      centerPadding: '100px',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
            centerPadding: '40px'
          }
        }
      ]
  
    });
  })
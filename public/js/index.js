!(function($) {
    "use strict";
    var nav = $('nav');
    var navHeight = nav.outerHeight();
  



  // Intro carousel (uses the Owl Carousel library)
  $('.owl-intro').owlCarousel({
    animateOut: 'fadeOutLeft',
    dots : true ,
    loop: true,
    nav : false ,
    autoplayHoverPause: false,
    autoplay: true ,
    smartSpeed: 3000, 
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576 : {
          items : 1
      } ,
      767 : {
        items : 1,
      },
      1000: {
        items: 1,
      }
    }
  });


})(jQuery);
new WOW().init();

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

const zoomIn = document.querySelector('#zoomIn')
const zoomOut = document.querySelector('#zoomOut')
const fullImg = document.querySelector('#fullImg')
zoomIn.style.color = '#fff'
zoomOut.style.color = '#fff'

let i = 1
zoomIn.addEventListener('click' , event => {
  // fullImg.style.transform = `scale(${i})`
  if(fullImg.style.transform <= 'scale(1.8)') {
    fullImg.style.transform = `scale(${i+=.2})`
    zoomIn.style.color = '#fff'
    zoomOut.style.color = '#fff'
  }else {
    fullImg.style.transform = `scale(${i+=0})`
    zoomIn.style.color = '#333'
    zoomOut.style.color = '#fff'
  }
  console.log(i)
})

zoomOut.addEventListener('click' , event => {
  if(fullImg.style.transform <= 'scale(1)') {
    fullImg.style.transform = `scale(${i-=0})`
    zoomOut.style.color = '#333'
    zoomIn.style.color = '#fff'
  }else {
    fullImg.style.transform = `scale(${i-=.2})`
    zoomOut.style.color = '#fff'
    zoomIn.style.color = '#fff'
  }
  console.log(i)
})


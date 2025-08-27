export default function sliders() {
  const introSlider = document.querySelector(".intro__slider");

  if (introSlider) {
    const swiper = new Swiper(introSlider, {
      speed: 900,
      // autoplay: {
      //   delay: 4000,
      // },
      pagination: {
        el: ".intro__pagination-slider",
        clickable: true,
      },
    });
  }

  const recSliders = document.querySelectorAll(".s-rec__slider");

  if (recSliders.length) {
    recSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 12,
        autoplay: {
          delay: 3500,
        },
        navigation: {
          nextEl: slider.nextElementSibling.querySelector(
            ".slider-nav__btn._next"
          ),
          prevEl: slider.nextElementSibling.querySelector(
            ".slider-nav__btn._prev"
          ),
        },
        breakpoints: {
          992: {
            slidesPerView: "auto",
            spaceBetween: 40,
          },
          576: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        },
      });
    });
  }
}

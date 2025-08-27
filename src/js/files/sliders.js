export default function sliders() {
  const introSlider = document.querySelector(".intro__slider");

  if (introSlider) {
    const swiper = new Swiper(introSlider, {
      speed: 900,
      autoplay: {
        delay: 4000,
      },
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

  const projectsSlider = document.querySelector(".s-projects__slider");

  if (projectsSlider) {
    const swiper = new Swiper(projectsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 8,
      // autoplay: {
      //   delay: 3200,
      // },
      initialSlide: 2,
      centeredSlides: true,
      navigation: {
        nextEl: ".s-projects .slider-nav__btn._next",
        prevEl: ".s-projects .slider-nav__btn._prev",
      },
      breakpoints: {
        1200: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
        576: {
          slidesPerView: "auto",
          spaceBetween: 20,
        },
      },
    });
  }
}

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
      autoplay: {
        delay: 3200,
      },
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

  const stepsSlider = document.querySelector(".s-steps__slider");
  if (stepsSlider) {
    const stepsNavSlider = document.querySelector(".s-steps__nav-slider");

    const thumbSwiper = new Swiper(stepsNavSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 8,
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
      },
    });

    const swiper = new Swiper(stepsSlider, {
      speed: 700,
      slidesPerView: 1,
      effect: "creative",
      creativeEffect: {
        prev: {
          // Предыдущий слайд уходит ВВЕРХ
          translate: [0, -30, 0], // X, Y, Z - двигаем только по Y оси вверх
          rotate: [0, 0, 0], // небольшой поворот для эффекта
          opacity: 1, // полупрозрачность
          scale: 0.95, // немного уменьшаем
        },
        next: {
          // Следующий слайд появляется СНИЗУ
          translate: [0, 0.1, 0], // X, Y, Z - двигаем только по Y оси вниз
          rotate: [0, 0, 0], // небольшой поворот
          opacity: 1, // полупрозрачность
          scale: 0.95, // немного уменьшаем
        },
        progressMultiplier: 1, // множитель прогресса
        limitProgress: 3, // лимит прогресса
        shadowPerProgress: false, // тень в зависимости от прогресса
        perspective: false,
      },
    });
  }
}

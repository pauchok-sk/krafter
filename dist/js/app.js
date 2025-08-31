(() => {
    "use strict";
    function burger() {
        const burgerOpen = document.querySelector("#burger-open");
        const burgerClose = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            burgerOverlay.addEventListener("click", handlerBurgerClose);
            burgerOpen.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerOpen();
            });
            burgerClose.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerClose();
            });
            function handlerBurgerClose() {
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
                document.body.classList.remove("body-hidden");
            }
            function handlerBurgerOpen() {
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                document.body.classList.add("body-hidden");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function headerDrop() {
        const drops = document.querySelectorAll(".header__drop");
        if (drops.length) {
            const header = document.querySelector(".header");
            const buttons = document.querySelectorAll("[data-header-drop]");
            const overlay = document.querySelector(".header__drop-overlay");
            buttons.forEach(btn => {
                btn.addEventListener("mouseenter", handleOpen);
                btn.addEventListener("mouseleave", handleClose);
            });
            window.addEventListener("scroll", () => {
                const currentDrop = document.querySelector(".header__drop._active");
                const currentOverlay = document.querySelector(".header__drop-overlay._active");
                if (currentDrop) updateSizeDrop(currentDrop, currentOverlay);
            });
            function handleOpen(e) {
                const drop = e.target.querySelector(".header__drop");
                overlay.classList.add("_active");
                drop.classList.add("_active");
                updateSizeDrop(drop, overlay);
            }
            function handleClose() {
                const drop = document.querySelector(".header__drop._active");
                overlay.classList.remove("_active");
                drop?.classList.remove("_active");
            }
            function updateSizeDrop(drop, overlay) {
                const headerTopHeight = document.querySelector(".header-top").clientHeight;
                const headerHeight = header.clientHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offsetTop = scrollTop <= headerTopHeight ? headerTopHeight + headerHeight - scrollTop : headerHeight;
                drop.style.top = `${offsetTop}px`;
                drop.style.maxHeight = `calc(100vh - ${offsetTop}px)`;
                overlay.style.top = `${offsetTop}px`;
                overlay.style.bottom = `${-offsetTop}px`;
                overlay.style.height = `100vh`;
            }
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > header.clientHeight && scrollTop > lastScrollTop) header.classList.add("_scroll"); else header.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function introAdv() {
        const buttons = document.querySelectorAll("[data-intro-adv-btn]");
        const windows = document.querySelectorAll("[data-intro-adv]");
        if (buttons.length && window.matchMedia("(max-width: 991px)").matches) {
            const buttonsClose = document.querySelectorAll("[data-intro-adv-close]");
            buttonsClose.forEach(btn => {
                btn.addEventListener("click", () => {
                    const window = btn.closest("[data-intro-adv]");
                    handleClose(window);
                });
            });
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.dataset.introAdvBtn;
                    const window = document.querySelector(`[data-intro-adv="${id}"]`);
                    handleOpen(window);
                });
            });
        }
        const wrappers = document.querySelectorAll(".intro-adv-wrapper");
        if (wrappers.length) wrappers.forEach(wrapper => {
            const buttonsNext = wrapper.querySelectorAll(".intro-adv__nav-btn");
            buttonsNext.forEach(btn => {
                btn.addEventListener("click", () => {
                    const nextWindow = btn.closest(".intro-adv").nextElementSibling;
                    console.log(nextWindow);
                    handleOpen(nextWindow);
                });
            });
        });
        function handleOpen(window) {
            windows.forEach(w => w.classList.remove("_open"));
            window.classList.add("_open");
            document.body.classList.add("body-hidden");
            document.querySelector(".header").classList.remove("_scroll");
        }
        function handleClose(window) {
            window.classList.remove("_open");
            document.body.classList.remove("body-hidden");
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function search() {
        const search = document.querySelector("#search");
        if (search) {
            const overlay = document.querySelector("#search-overlay");
            const btn = document.querySelector("#search-btn");
            const headerTopHeight = document.querySelector(".header-top").clientHeight;
            const headerHeight = document.querySelector(".header").clientHeight;
            btn.addEventListener("click", e => {
                e.stopPropagation();
                if (search.classList.contains("_active")) handleClose(); else handleOpen();
            });
            document.body.addEventListener("click", handleClose);
            search.addEventListener("click", e => e.stopPropagation());
            function handleOpen() {
                search.classList.add("_active");
                overlay.classList.add("_active");
                btn.classList.add("_active");
                document.body.classList.add("body-hidden");
                updateSize();
            }
            function handleClose() {
                search.classList.remove("_active");
                overlay.classList.remove("_active");
                btn.classList.remove("_active");
                document.body.classList.remove("body-hidden");
            }
            function updateSize() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offsetTop = scrollTop <= headerTopHeight ? headerTopHeight + headerHeight - scrollTop : headerHeight;
                search.style.top = offsetTop + "px";
                overlay.style.top = offsetTop + "px";
            }
        }
    }
    function sliders() {
        const introSlider = document.querySelector(".intro__slider");
        if (introSlider) {
            const swiper = new Swiper(introSlider, {
                speed: 900,
                autoplay: {
                    delay: 1e4
                },
                pagination: {
                    el: ".intro__pagination-slider",
                    clickable: true
                }
            });
            introSlider.addEventListener("mouseenter", () => {
                swiper.autoplay.stop();
            });
            introSlider.addEventListener("mouseleave", () => {
                swiper.autoplay.start();
            });
        }
        const productSliders = document.querySelectorAll(".card-product__slider");
        if (productSliders.length) productSliders.forEach(slider => {
            new Swiper(slider, {
                speed: 900,
                spaceBetween: 15,
                pagination: {
                    el: slider.closest(".card-product").querySelector(".slider-pagination"),
                    clickable: true
                }
            });
        });
        const recSliders = document.querySelectorAll(".s-rec__slider");
        if (recSliders.length) recSliders.forEach(slider => {
            const swiper = new Swiper(slider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 12,
                autoplay: {
                    delay: 3500
                },
                navigation: {
                    nextEl: slider.nextElementSibling.querySelector(".slider-nav__btn._next"),
                    prevEl: slider.nextElementSibling.querySelector(".slider-nav__btn._prev")
                },
                breakpoints: {
                    992: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    },
                    576: {
                        slidesPerView: "auto",
                        spaceBetween: 20
                    }
                }
            });
            slider.addEventListener("mouseenter", () => {
                swiper.autoplay.stop();
            });
            slider.addEventListener("mouseleave", () => {
                swiper.autoplay.start();
            });
        });
        const projectsSlider = document.querySelector(".s-projects__slider");
        if (projectsSlider) {
            const swiper = new Swiper(projectsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 8,
                autoplay: {
                    delay: 3200
                },
                initialSlide: 2,
                centeredSlides: true,
                navigation: {
                    nextEl: ".s-projects .slider-nav__btn._next",
                    prevEl: ".s-projects .slider-nav__btn._prev"
                },
                breakpoints: {
                    1200: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    },
                    576: {
                        slidesPerView: "auto",
                        spaceBetween: 20
                    }
                }
            });
            projectsSlider.addEventListener("mouseenter", () => {
                swiper.autoplay.stop();
            });
            projectsSlider.addEventListener("mouseleave", () => {
                swiper.autoplay.start();
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
                        spaceBetween: 16
                    }
                }
            });
            new Swiper(stepsSlider, {
                speed: 700,
                slidesPerView: 1,
                effect: "creative",
                thumbs: {
                    swiper: thumbSwiper
                },
                navigation: {
                    prevEl: ".s-steps .slider-nav__btn._prev",
                    nextEl: ".s-steps .slider-nav__btn._next"
                },
                pagination: {
                    el: ".s-steps .slider-pagination",
                    clickable: true
                },
                creativeEffect: {
                    prev: {
                        translate: [ 0, -30, 0 ],
                        rotate: [ 0, 0, 0 ],
                        opacity: 1,
                        scale: .95
                    },
                    next: {
                        translate: [ 0, 0, 0 ],
                        rotate: [ 0, 0, 0 ],
                        opacity: 1,
                        scale: .95
                    },
                    progressMultiplier: 1,
                    limitProgress: 2,
                    shadowPerProgress: false,
                    perspective: false
                }
            });
        }
        const advSlider = document.querySelector(".s-adv__slider");
        if (advSlider) {
            new Swiper(advSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 8,
                autoplay: {
                    delay: 3500
                },
                initialSlide: 1,
                centeredSlides: true,
                navigation: {
                    nextEl: ".s-adv .slider-nav__btn._next",
                    prevEl: ".s-adv .slider-nav__btn._prev"
                },
                pagination: {
                    el: ".s-adv .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    },
                    576: {
                        slidesPerView: "auto",
                        spaceBetween: 20
                    }
                }
            });
        }
        const complexSlider = document.querySelector(".s-complex__slider");
        if (complexSlider) {
            new Swiper(complexSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 8,
                autoplay: {
                    delay: 3200
                },
                navigation: {
                    nextEl: ".s-complex .slider-nav__btn._next",
                    prevEl: ".s-complex .slider-nav__btn._prev"
                },
                pagination: {
                    el: ".s-complex .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    },
                    576: {
                        slidesPerView: "auto",
                        spaceBetween: 20
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function tabs() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelectorAll("[data-tab-btn]");
                const allTabs = container.querySelectorAll("[data-tab]");
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_active");
                    t.style.opacity = 0;
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.style.opacity = 1;
                }, 10);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    spoller();
    burger();
    sliders();
    tabs();
    mediaAdaptive();
    introAdv();
    headerScroll();
    headerDrop();
    search();
    Fancybox.bind("[data-fancybox]", {});
})();
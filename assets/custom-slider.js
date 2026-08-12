const slider_config_type = {
  1: {
    slidesPerView: 5,
    spaceBetween: 20,
    breakpoints: {
      1: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      380: {
        slidesPerView: 2,
      },
      640: {
       slidesPerView: 3,
      },
      768: {
       slidesPerView: 4,
       spaceBetween: 20,
      },
      1024: {
       slidesPerView: 5
      }
    }
  },
  2: {
    slidesPerView: 1,
  },
  3: {
    slidesPerView: 'auto',
    direction: 'vertical',
    spaceBetween: 19,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      1: {
        direction: 'horizontal',
        spaceBetween: 8,
      },
      768: {
        direction: 'vertical',
        spaceBetween: 12,
      },
    },
  },
  4: {
    slidesPerView: 1,
    direction: 'vertical',
    speed: 450,
    loop: true,
    allowTouchMove: false,
    simulateTouch: false,
    autoplay: {
      delay: 1600,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
  },
};

class CustomSlider extends HTMLElement {
  connectedCallback() {
    if (this.swiper) return;

    this.index = this.dataset.index || 1;

    const isThumb = this.classList.contains('swiper-thumb');
    const noNavigation =
      this.hasAttribute('data-no-navigation') || isThumb;

    const nextEl = !noNavigation
      ? this.querySelector('.swiper-button-next') ||
        this.closest('.shopify-section')?.querySelector(
          '.swiper-button-next'
        )
      : null;

    const prevEl = !noNavigation
      ? this.querySelector('.swiper-button-prev') ||
        this.closest('.shopify-section')?.querySelector(
          '.swiper-button-prev'
        )
      : null;

    const navigation =
      nextEl && prevEl
        ? {
            navigation: {
              nextEl,
              prevEl,
            },
          }
        : {};

    const pagination = this.getProgressConfig();

    this.config = {
      ...slider_config_type[this.index],
      ...navigation,
      ...pagination,
      observer: true,
      observeParents: true,
    };

    if (this.classList.contains('swiper-main-thumb')) {
      this.initMainWithThumbs();
      return;
    }

    this.swiper = new Swiper(this, this.config);
  }

  getProgressConfig() {
    if (!this.hasAttribute('data-progress')) return {};

    const progressEl = this.querySelector('.swiper-pagination');

    if (!progressEl) return {};

    return {
      pagination: {
        el: progressEl,
        type: 'progressbar',
      },
    };
  }

  initMainWithThumbs() {
    const section =
      this.closest('.section-thumbnail-slider__wrap') ||
      this.closest('.shopify-section');

    const thumbSlider = section?.querySelector(
      'custom-slider.swiper-thumb'
    );

    if (!thumbSlider) {
      this.swiper = new Swiper(this, this.config);
      return;
    }

    const init = () => {
      if (!thumbSlider.swiper) {
        requestAnimationFrame(init);
        return;
      }

      this.swiper = new Swiper(this, {
        ...this.config,
        thumbs: {
          swiper: thumbSlider.swiper,
          autoScrollOffset: 1,
        },
      });
    };

    init();
  }
}

customElements.define('custom-slider', CustomSlider);
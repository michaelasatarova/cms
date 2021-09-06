interface SlickOptionsWithHandlers extends JQuerySlickOptions {
  onAfterChange?: ( e: Event | undefined, slick: JQuerySlick, currentSlide: number ) => void;
}

interface SliderConfigs {
  default: SlickOptionsWithHandlers;
  [ key: string ]: SlickOptionsWithHandlers | ( ( element: HTMLElement ) => SlickOptionsWithHandlers );
}

export class SliderHelper {
  public readonly SLIDER_CONFIGS: SliderConfigs = {
    default: {
      autoplay: false,
      autoplaySpeed: 4000,
      infinite: true,
      arrows: false,
      dots: true,
      respondTo: 'window',
      responsive: [
        // {
        //   breakpoint: 1201, // active at <= 1200px
        //   settings: {
        //     slidesToShow: 5
        //   }
        // }
      ]
    },

    'slider-grid': element => ( {
      infinite: true,
      autoplaySpeed: 3500,
      autoplay: true,
      arrows: true,
      prevArrow:
        '<div class="slick-prev-grid slick-arrow-grid"><i class="fal fa-angle-left"></i></div>',
      nextArrow:
        '<div class="slick-next-grid slick-arrow-grid"><i class="fal fa-angle-right"></i></div>',
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 994,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    } ),
  };

  constructor(
    private slidersSelector: string
  ) { }

  public initSliders(): void {
    const sliders = $( this.slidersSelector );
    sliders.each(
      ( i, el ) => {
        this.initSlider( $( el ) );
      }
    );
  }

  // ---------------------------------------------------------------------------

  private initSlider( el: JQuery ): void {
    const config = this.getConfig( el );
    el.slick( config );
  }

  private getConfig( el: JQuery ): SlickOptionsWithHandlers {
    const configKey = el.data( 'slickconfig' );
    if (
      typeof configKey === 'string' && configKey.length > 0
      && configKey in this.SLIDER_CONFIGS
    ) {
      const config = this.SLIDER_CONFIGS[ configKey ];
      return typeof config === 'function' ? config( el[ 0 ] ) : config;
    }
    return this.SLIDER_CONFIGS.default;
  }
}

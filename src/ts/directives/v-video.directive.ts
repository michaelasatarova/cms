import { VDirective, VServices } from '@libTs/vue-base';
import { DirectiveBinding } from 'vue/types/options';

export const video: VDirective = [
  'video',
  {
    bind(el: HTMLElement, binding: DirectiveBinding) {
      function toggleOverlay(display: string, bindingValue: string): void {
        $('.webkit-double-video-overlay').each(function() {
          if (bindingValue == this.getAttribute('data-ytId')) {
            this.style.display = display;
          }
        });
      }

      if (binding.arg == 'play') {
        el.addEventListener('click', function() {
          toggleOverlay('block', binding.value);

          $('.webkit-double-video').each(function(
            this: HTMLIFrameElement
          ): void {
            if (binding.value == this.getAttribute('data-ytId')) {
              this.src += '&autoplay=1';
            }
          });
        });
      }

      if (binding.arg == 'close') {
        el.addEventListener('click', function() {
          $('.webkit-double-video').each(function(
            this: HTMLIFrameElement
          ): void {
            if (this.contentWindow) {
              this.contentWindow.postMessage(
                '{"event":"command","func":"stopVideo","args":""}',
                '*'
              );
            }
          });
          toggleOverlay('none', binding.value);
        });
      }
    },
  },
];

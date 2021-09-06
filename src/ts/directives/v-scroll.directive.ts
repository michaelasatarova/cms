import { VDirective, VServices } from '@libTs/vue-base';
import { DirectiveBinding } from 'vue/types/options';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const scroll: VDirective = [
  'scroll',
  {
    bind(el: HTMLElement, binding: DirectiveBinding) {
      el.addEventListener('click', function() {
        gsap.to(window, {
          duration: 1,
          scrollTo: binding.value,
        });
      });
    },
  },
];

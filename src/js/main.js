import { modals } from './modules/index';
import { sliders } from './modules/index';
import { forms } from './modules/index';
import { checkTextInputs } from './modules/index';
import { mask } from './modules/index';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  sliders({
    slides: '.feedback-slider-item',
    dir: '',
    prev: '.main-prev-btn',
    next: '.main-next-btn'
  });
  sliders({
    slides: '.main-slider-item',
    dir: 'vertical'
  });
  forms();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
});

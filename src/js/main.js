import {
  modals,
  sliders,
  forms,
  checkTextInputs,
  mask,
  showModeStyles,
  calc,
  filter,
  pictureSize,
  accordion,
  burger
} from './modules/';

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
  showModeStyles('.button-styles', '#styles .row');
  calc({
    size: '#size',
    material: '#material',
    options: '#options',
    promocode: '.promocode',
    result: '.calc-price'
  });
  filter();
  pictureSize('.sizes-block');
  accordion('.accordion-heading');
  burger('.burger-menu', '.burger');
});

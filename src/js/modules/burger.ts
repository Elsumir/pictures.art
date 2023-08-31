export const burger = (menuBurger: string, burgerSelector: string) => {
  const menuElem = document.querySelector<HTMLDivElement>(menuBurger);
  const burgerElem = document.querySelector(burgerSelector);

  if (!menuElem) {
    return;
  }

  const displayToggle = (selector: string) =>
    (menuElem.style.display = selector);

  displayToggle('none');

  burgerElem?.addEventListener('click', () => {
    menuElem.style.display == 'none' && window.screen.availWidth < 993
      ? displayToggle('block')
      : displayToggle('none');
  });
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      displayToggle('none');
    }
  });
};

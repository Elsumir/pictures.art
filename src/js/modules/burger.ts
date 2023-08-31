export const burger = (menuBurger: string, burgerSelector: string) => {
  const menuElem = document.querySelector<HTMLDivElement>(menuBurger);
  const burgerElem = document.querySelector(burgerSelector);
  const BREAKPOINT = 993;

  if (!menuElem) {
    return;
  }

  const displayToggle = (selector: string) =>
    (menuElem.style.display = selector);

  displayToggle('none');

  burgerElem?.addEventListener('click', () => {
    menuElem.style.display == 'none' && window.screen.availWidth < BREAKPOINT
      ? displayToggle('block')
      : displayToggle('none');
  });
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > BREAKPOINT) {
      displayToggle('none');
    }
  });
};

export const scrolling = (upSelector: string) => {
  const upElem = document.querySelector(upSelector);

  window.addEventListener('scroll', () => {
    const toggleClass = (fade: string, removeFade: string, animate?: any) => {
      upElem?.classList.add(fade, animate);
      upElem?.classList.remove(removeFade);
    };

    document.documentElement.scrollTop > 1650
      ? toggleClass('fadeIn', 'fadeOut', 'animated')
      : toggleClass('fadeOut', 'fadeIn');
  });

  const links = document.querySelectorAll('[href^="#"]');
  const speed = 0.3;

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const widthTop = document.documentElement.scrollTop;
      const hash = this.hash;
      const toBlock = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      const step = (time: any) => {
        if (start === null) {
          start = time;
        }
        if (!start) {
          return;
        }

        const progress = time - start,
          r =
            toBlock < 0
              ? Math.max(widthTop - progress / speed, widthTop + toBlock)
              : Math.min(widthTop + progress / speed, widthTop + toBlock);

        document.documentElement.scrollTo(0, r);
        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      };

      requestAnimationFrame(step);
    });
  });
};

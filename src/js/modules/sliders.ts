interface ISliders {
  slides: string;
  dir: string;
  prev?: string;
  next?: string;
}

export const sliders = ({ slides, dir, prev, next }: ISliders) => {
  let slideIndex: number = 1;
  let paused: any = false;
  const items = document.querySelectorAll<HTMLDivElement>(slides);

  const showSlides = (n: number) => {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach((item) => {
      item.classList.add('animated');

      if (item) {
        item.style.display = 'none';
      }
    });

    items[slideIndex - 1].style.display = 'block';
  };
  showSlides(slideIndex);

  const plusSlides = (n: number) => showSlides((slideIndex += n));

  try {
    if (prev !== undefined && next !== undefined) {
      const prevBtn = document.querySelector(prev);
      const nextBtn = document.querySelector(next);

      prevBtn?.addEventListener('click', () => {
        plusSlides(-1);
        items[slideIndex - 1].classList.remove('slideInLeft');
        items[slideIndex - 1].classList.add('slideInRight');
      });
      nextBtn?.addEventListener('click', () => {
        plusSlides(1);
        items[slideIndex - 1].classList.remove('slideInRight');
        items[slideIndex - 1].classList.add('slideInLeft');
      });
    }
  } catch (e) {
    console.log(e);
  }

  const activateAnimation = () => {
    if (dir === 'vertical') {
      paused = setInterval(() => {
        plusSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 3000);
    } else {
      paused = setInterval(() => {
        plusSlides(1);
        items[slideIndex - 1].classList.remove('slideInLeft');
        items[slideIndex - 1].classList.add('slideInRight');
      }, 3000);
    }
  };

  activateAnimation();

  items[0].parentNode?.addEventListener('mouseenter', () =>
    clearInterval(paused)
  );
  items[0].parentNode?.addEventListener('mouseleave', () =>
    activateAnimation()
  );
};

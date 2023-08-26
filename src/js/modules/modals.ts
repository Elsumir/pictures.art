export const modals = () => {
  let btnPressed: boolean = false;
  interface IModals {
    triggersSelector: string;
    modalSelector: string;
    closeSelector: string;
    destroy?: boolean;
  }
  const bindModal = ({
    triggersSelector,
    modalSelector,
    closeSelector,
    destroy
  }: IModals): void => {
    const triggers = document.querySelectorAll(triggersSelector);
    const modal = document.querySelector<HTMLDivElement>(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll<HTMLDivElement>('[data-modal]');
    const scroll = calcScroll();

    const windowsClose = () => {
      windows.forEach((window) => {
        window.style.display = 'none';
        window.classList.add('animated', 'fadeIn');
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          trigger.remove();
        }

        windowsClose();

        if (modal) {
          modal.style.display = 'block';
        }

        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    const closeModal = () => {
      if (modal) {
        modal.style.display = 'none';
      }

      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    close?.addEventListener('click', () => {
      windowsClose();
      closeModal();
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        windowsClose();
        closeModal();
      }
    });
  };

  const calcScroll = (): number => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  };

  const showModalByTime = (selector: string, time: number) => {
    setTimeout(function () {
      let display: string = '';

      document.querySelectorAll('[data-modal]').forEach((item) => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        const select = document.querySelector<HTMLDivElement>(selector);
        if (select) {
          select.style.display = 'block';
        }
        document.body.style.overflow = '';
        const scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  };

  const openByScroll = (selector: string) => {
    window.addEventListener('scroll', () => {
      if (
        !btnPressed &&
        window.scrollY + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight
      ) {
        document.querySelector<HTMLDivElement>(selector)?.click();
      }
    });
  };

  bindModal({
    triggersSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close',
    destroy: false
  });

  bindModal({
    triggersSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close',
    destroy: false
  });
  bindModal({
    triggersSelector: '.fixed-gift',
    modalSelector: '.popup-gift',
    closeSelector: '.popup-gift .popup-close',
    destroy: true
  });
  openByScroll('.fixed-gift');

  // showModalByTime('.popup-consultation', 60000);
};

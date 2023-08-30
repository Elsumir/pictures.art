export const accordion = (triggersSelector: string) => {
  const btns = document.querySelectorAll(triggersSelector);

  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active-style');
      this.nextElementSibling.classList.toggle('active-content');
      this.classList.contains('active-style')
        ? (this.nextElementSibling.style.maxHeight =
            this.nextElementSibling.scrollHeight + 80 + 'px')
        : (this.nextElementSibling.style.maxHeight = '0px');
    });
  });
};

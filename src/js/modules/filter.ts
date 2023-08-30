export const filter = () => {
  const menu = document.querySelector('.portfolio-menu');
  const items = menu?.querySelectorAll('li');
  const btnAll = menu?.querySelector('.all');
  const btnLovers = menu?.querySelector('.lovers');
  const btnChef = menu?.querySelector('.chef');
  const btnGirl = menu?.querySelector('.girl');
  const btnGuy = menu?.querySelector('.guy');
  const btnGrandmother = menu?.querySelector('.grandmother');
  const btnGrandad = menu?.querySelector('.granddad');
  const wrapper = document.querySelector('.portfolio-wrapper');
  const markAll = wrapper?.querySelectorAll('.all');
  const no = document.querySelector('.portfolio-no');

  const displayNone = (selector: any) => {
    selector.style.display = 'none';
    selector.classList.remove('animated', 'fadeIn');
  };
  const displayBlock = (selector: any) => {
    selector.style.display = 'block';
    selector.classList.add('animated', 'fadeIn');
  };

  const typeFilter = (markType: any) => {
    markAll?.forEach((mark) => displayNone(mark));

    displayNone(no);

    markType.length
      ? markType.forEach((mark) => displayBlock(mark))
      : displayBlock(no);
  };

  const clickFilter = (selector: any) => {
    const nameClass = wrapper?.querySelectorAll(`.${selector.className}`);

    selector.addEventListener('click', () =>
      selector.className === 'all' ? typeFilter(markAll) : typeFilter(nameClass)
    );
  };

  clickFilter(btnAll);
  clickFilter(btnLovers);
  clickFilter(btnChef);
  clickFilter(btnGirl);
  clickFilter(btnGuy);
  clickFilter(btnGrandmother);
  clickFilter(btnGrandad);

  menu?.addEventListener('click', (e) => {
    const target = <HTMLElement>e.target;

    if (target && target.tagName == 'LI') {
      items?.forEach((btn) => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

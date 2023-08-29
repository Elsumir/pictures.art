import { getResource } from '../services/request';

export const showModeStyles = (trigger: string, wrapper: string) => {
  const btn = document.querySelector(trigger);

  btn?.addEventListener('click', function () {
    getResource('http://localhost:3000/styles')
      .then((res) => createCards(res))
      .catch((error) => console.log(error));

    this.remove();
  });

  const createCards = (response: []) => {
    response.forEach(({ src, title, link }) => {
      const card = document.createElement('div');

      card.classList.add(
        'animated',
        'fadeInUp',
        'col-sm-3',
        'col-sm-offset-0',
        'col-xs-10',
        'col-xs-offset-1'
      );

      const fullScr = `./src/${src}`;

      card.innerHTML = `
        <div class=styles-block>
          <img src=${fullScr} alt="style">
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;

      document.querySelector(wrapper)?.appendChild(card);
    });
  };
};

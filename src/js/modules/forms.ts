import { postData } from '../services/request';

export const forms = (): void => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    uploads = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро с Вами свяжуться!',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const clearInput = () => {
    inputs.forEach((input) => {
      input.value = '';
    });
    uploads.forEach((upload) => {
      if (upload.previousElementSibling) {
        upload.previousElementSibling.textContent = 'Файл не выбран';
      }
    });
  };
  // <HTMLDivElement><HTMLInputElement>
  uploads.forEach((upload) => {
    upload.addEventListener('input', () => {
      let dots;

      const arr = upload.files?.name.split('.');

      const name = arr[0].substring(0, 6) + dots + arr[1];

      arr[0].length > 6 ? (dots = '...') : (dots = '.');

      console.log(dots);

      if (upload.previousElementSibling) {
        upload.previousElementSibling.textContent = name;
      }
    });
  });

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      let api;
      item.closest('.popup-design') || item.classList.contains('calc_form')
        ? (api = path.designer)
        : (api = path.question);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInput();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

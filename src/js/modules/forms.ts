import { postData } from '../services/request';

export const forms = (): void => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const uploads = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро с Вами свяжуться!',
    failure: 'Что-то пошло не так...',
    spinner: '...',
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
  uploads.forEach((upload) => {
    upload.addEventListener('input', () => {
      const uploadInput = upload as HTMLInputElement;

      if (!uploadInput.files) {
        return;
      }

      const file = uploadInput.files[0];
      const [fileName, fileExt] = file.name.split('.');
      const dots = fileName.length > 6 ? '...' : '.';
      const name = `${fileName.substring(0, 6)} ${dots} ${fileExt}`;

      if (upload.previousElementSibling) {
        upload.previousElementSibling.textContent = name;
      }
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.parentNode?.appendChild(statusMessage);

      form.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        form.style.display = 'none';
      }, 400);

      const statusImg = document.createElement('img');
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(form);
      const JSONData = Object.fromEntries(formData);

      const api =
        form.closest('.popup-design') || form.classList.contains('calc_form')
          ? path.designer
          : path.question;

      postData(api, JSONData)
        .then((res) => {
          textMessage.textContent = message.success;
        })
        .catch(() => {
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInput();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

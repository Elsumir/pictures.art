export const checkTextInputs = (selector: string) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach((input) => {
    input.addEventListener('keypress', (e: any) => {
      const onlyRussian = /[^а-яё 0-9]/gi;
      if (e.key.match(onlyRussian)) {
        e.preventDefault();
      }
    });
  });
};

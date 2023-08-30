interface ICalc {
  size: string;
  material: string;
  options: string;
  promocode: string;
  result: any;
}

export const calc = ({ size, material, options, promocode, result }: ICalc) => {
  const sizeBlock = document.querySelector<HTMLFormElement>(size);
  const materialBlock = document.querySelector<HTMLFormElement>(material);
  const optionsBlock = document.querySelector<HTMLFormElement>(options);
  const promocodeBlock = document.querySelector<HTMLFormElement>(promocode);
  const resultBlock = document.querySelector(result);

  let sum: number = 0;

  const calcFunc = () => {
    sum = Math.round(
      +sizeBlock?.value * +materialBlock?.value + +optionsBlock?.value
    );

    if (!resultBlock) {
      return;
    }

    if (!sizeBlock?.value || !materialBlock?.value) {
      resultBlock.textContent = 'Пожалуйста, выберите метериал';
    } else if (promocodeBlock?.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock?.addEventListener('change', calcFunc);
  materialBlock?.addEventListener('change', calcFunc);
  optionsBlock?.addEventListener('change', calcFunc);
  promocodeBlock?.addEventListener('input', calcFunc);
};

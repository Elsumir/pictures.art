export const mask = (selector: string) => {
  const setCursorPosition = (pos: number, elem: any) => {
    elem.focus();

    if (elem.setCursorPosition) {
      elem.setCursorPosition(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event: FocusEvent) {
    let matrix = '+7 (___) ___ __ __',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, (abc) => {
      return /[_\d]/.test(abc) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ''
        : abc;
    });

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  const inputs: NodeList = document.querySelectorAll(selector);

  inputs.forEach((input: any) => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

export const pictureSize = (imgSelector: string) => {
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(block: Element) {
    const img = block.querySelector('img');
    if (!img) {
      return;
    }
    img.src = img.src.slice(0, -4) + '-1.png';
    block
      .querySelectorAll<HTMLDivElement>('p:not(.sizes-hit')
      .forEach((p) => (p.style.display = 'none'));
  }

  function hideImg(block: Element) {
    const img = block.querySelector('img');
    if (!img) {
      return;
    }
    img.src = img.src.slice(0, -6) + '.png';
    block
      .querySelectorAll<HTMLDivElement>('p:not(.sizes-hit')
      .forEach((p) => (p.style.display = 'block'));
  }

  blocks.forEach((block) => {
    block.addEventListener('mouseover', () => showImg(block));
    block.addEventListener('mouseout', () => hideImg(block));
  });
};

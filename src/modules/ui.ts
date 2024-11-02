import '../components/bear-card';

// Types for the bear data
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const toggleComments = (
  showHideBtn: HTMLButtonElement,
  commentWrapper: HTMLDivElement
): void => {
  showHideBtn.addEventListener('click', () => {
    const isShowing = showHideBtn.textContent === 'Hide comments';
    showHideBtn.textContent = isShowing ? 'Show comments' : 'Hide comments';
    commentWrapper.style.display = isShowing ? 'none' : 'block';
  });
};

const renderBearImages = (bears: Bear[]): void => {
  if (!Array.isArray(bears) || bears.length === 0) {
    console.warn('No bear data available to render.');
    return;
  }

  const moreBearsSection =
    document.querySelector<HTMLDivElement>('.more_bears');

  if (moreBearsSection) {
    moreBearsSection.innerHTML = '';

    bears.forEach(({ name, binomial, image, range }) => {
      const bearCard = document.createElement('bear-card');

      bearCard.setAttribute('name', name);
      bearCard.setAttribute('binomial', binomial);
      bearCard.setAttribute('image', image);
      bearCard.setAttribute('range', range);

      moreBearsSection.appendChild(bearCard);
    });
  } else {
    console.warn("The '.more_bears' container was not found in the document.");
  }
};

export { toggleComments, renderBearImages };

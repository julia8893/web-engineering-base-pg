import { toggleComments, renderBearImages } from './modules/ui';
import { initComment } from './modules/comments';
import { getBearData } from './modules/bears';

const initializeComments = (): void => {
  const showHideBtn = document.querySelector(
    '.show-hide'
  ) as HTMLButtonElement | null;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLDivElement | null;

  if (showHideBtn && commentWrapper) {
    commentWrapper.style.display = 'none';
    toggleComments(showHideBtn, commentWrapper);
  } else {
    console.warn('Comment toggle elements not found.');
  }
};

const initializeCommentForm = (): void => {
  const form = document.querySelector(
    '.comment-form'
  ) as HTMLFormElement | null;
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector(
    '#comment'
  ) as HTMLTextAreaElement | null;
  const list = document.querySelector(
    '.comment-container'
  ) as HTMLUListElement | null;

  if (form && nameField && commentField && list) {
    initComment(form, nameField, commentField, list);
  } else {
    console.warn('Comment form elements not found.');
  }
};

const fetchAndDisplayBears = async (): Promise<void> => {
  try {
    const bears = await getBearData();
    if (bears) {
      renderBearImages(bears);
    } else {
      console.warn('No bear data available to display.');
    }
  } catch (err) {
    console.error('Error fetching bear data:', err);
  }
};

const initializeWebApp = (): void => {
  initializeComments();
  initializeCommentForm();
  fetchAndDisplayBears();
};

initializeWebApp();

const initComment = (
  form: HTMLFormElement,
  nameField: HTMLInputElement,
  commentField: HTMLTextAreaElement,
  list: HTMLUListElement,
  showHideButton: HTMLButtonElement | null // Accepts the button as a parameter
): void => {
  const commentWrapper = list.parentElement; // Assuming the UL is within a parent that represents the comment section
  if (commentWrapper) {
    commentWrapper.style.display = 'none';
    showHideButton?.setAttribute('aria-expanded', 'false');
  }

  // Toggle comments visibility
  const toggleComments = (): void => {
    if (commentWrapper) {
      const isExpanded =
        showHideButton?.getAttribute('aria-expanded') === 'true';
      showHideButton?.setAttribute('aria-expanded', String(!isExpanded));
      commentWrapper.style.display = isExpanded ? 'none' : 'block';
    }
  };

  if (showHideButton) {
    showHideButton.setAttribute('tabindex', '0'); // Makes it focusable

    // Event listener for clicking the button
    showHideButton.addEventListener('click', () => {
      toggleComments();
    });

    // Event listener for pressing the Return key
    showHideButton.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'enter') {
        toggleComments();
      }
    });
  }

  form.onsubmit = (e: Event): void => {
    e.preventDefault();

    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();

    // Basic validation to ensure both fields have input
    if (!nameValue || !commentValue) {
      alert('Please enter both your name and comment.');
      return;
    }

    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    list.appendChild(listItem);

    // Clear the fields after submitting
    nameField.value = '';
    commentField.value = '';

    // Show comments after a new comment is added
    if (commentWrapper) {
      commentWrapper.style.display = 'block';
      showHideButton?.setAttribute('aria-expanded', 'true');
    }
  };
};

export { initComment };

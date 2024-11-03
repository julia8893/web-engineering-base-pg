import { describe, it, beforeEach, expect, vi } from 'vitest';
import { toggleComments, renderBearImages } from '.././src/modules/ui';
import '.././src/components/bear-card';

beforeEach(() => {
  document.body.innerHTML = `
    <button class="show-hide">Hide comments</button>
    <div class="comment-wrapper" style="display: block;"></div>
    <div class="more_bears"></div>
  `;
});

describe('UI Module', () => {
  // TEST 1
  it('toggleComments should toggle the display of comments', () => {
    const showHideBtn = document.querySelector(
      '.show-hide'
    ) as HTMLButtonElement;
    const commentWrapper = document.querySelector(
      '.comment-wrapper'
    ) as HTMLDivElement;

    // Initial state: comments are visible
    expect(commentWrapper.style.display).toBe('block');
    expect(showHideBtn.textContent).toBe('Hide comments');

    // Click to hide comments
    toggleComments(showHideBtn, commentWrapper);
    showHideBtn.click();

    // After first click: comments should be hidden
    expect(commentWrapper.style.display).toBe('none');
    expect(showHideBtn.textContent).toBe('Show comments');

    // Click again to show comments
    showHideBtn.click();

    // After second click: comments should be visible again
    expect(commentWrapper.style.display).toBe('block');
    expect(showHideBtn.textContent).toBe('Hide comments');
  });

  // TEST 2
  it('renderBearImages should create bear cards for the provided data', () => {
    const testBears = [
      {
        name: 'Giant panda',
        binomial: 'A. melanoleuca',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG',
        range: 'Central China',
      },
      {
        name: 'Spectacled bear',
        binomial: 'T. ornatus',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/99/Spectacled_Bear_-_Houston_Zoo.jpg',
        range: 'Andes mountains in South America',
      },
    ];

    renderBearImages(testBears);

    // Check that the correct number of bear cards are created
    const bearCards = document.querySelectorAll('bear-card');
    expect(bearCards.length).toBe(testBears.length);

    // Verify that the bear cards have the correct attributes
    testBears.forEach((bear, index) => {
      expect(bearCards[index].getAttribute('name')).toBe(bear.name);
      expect(bearCards[index].getAttribute('binomial')).toBe(bear.binomial);
      expect(bearCards[index].getAttribute('image')).toBe(bear.image);
      expect(bearCards[index].getAttribute('range')).toBe(bear.range);
    });
  });

  // TEST 3
  it('renderBearImages should warn if no bears are provided', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}); // Mock implementation
    renderBearImages([]); // Call with an empty array

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'No bear data available to render.'
    );

    consoleWarnSpy.mockRestore(); // Restore the original console.warn
  });

  // TEST 4
  it('renderBearImages should warn if the container is not found', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}); // Mock implementation

    // Temporarily remove the .more_bears container
    const moreBearsSection = document.querySelector('.more_bears')!;
    moreBearsSection.parentNode!.removeChild(moreBearsSection);

    renderBearImages([
      {
        name: 'Test Bear',
        binomial: 'Test Binomial',
        image: 'test.jpg',
        range: 'Testrange',
      },
    ]);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "The '.more_bears' container was not found in the document."
    );

    consoleWarnSpy.mockRestore(); // Restore the original console.warn
  });
});

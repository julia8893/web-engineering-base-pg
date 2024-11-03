import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initComment } from '.././src/modules/comments';

describe('Commments Module', () => {
  let form: HTMLFormElement;
  let nameField: HTMLInputElement;
  let commentField: HTMLTextAreaElement;
  let list: HTMLUListElement;

  beforeEach(() => {
    form = document.createElement('form');
    nameField = document.createElement('input');
    commentField = document.createElement('textarea');
    list = document.createElement('ul');

    form.appendChild(nameField);
    form.appendChild(commentField);

    // Initialize the function with the mock elements
    initComment(form, nameField, commentField, list);
  });

  // TEST 1
  it('should add a comment to the list when both name and comment fields are filled', () => {
    nameField.value = 'John Doe';
    commentField.value = 'This is a test comment';

    // Submit the form
    form.dispatchEvent(new Event('submit'));

    // Check that the list has a new item
    expect(list.children.length).toBe(1);
    const listItem = list.children[0];
    expect(listItem).toBeInstanceOf(HTMLLIElement);

    // Check that the item contains the name and comment text
    const [namePara, commentPara] = listItem.children;
    expect(namePara.textContent).toBe('John Doe');
    expect(commentPara.textContent).toBe('This is a test comment');
  });

  // TEST 2
  it('should not add a comment to the list if either field is empty', () => {
    nameField.value = 'John Doe';
    commentField.value = '';

    // Spy on alert to verify it's called
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Submit the form
    form.dispatchEvent(new Event('submit'));

    // Verify alert is called and no item is added to the list
    expect(alertSpy).toHaveBeenCalledWith(
      'Please enter both your name and comment.'
    );
    expect(list.children.length).toBe(0);

    // Clear the alert mock
    alertSpy.mockRestore();
  });

  // TEST 3
  it('should clear the name and comment fields after successful submission', () => {
    nameField.value = 'John Doe';
    commentField.value = 'This is another test comment';

    // Submit the form
    form.dispatchEvent(new Event('submit'));

    // Verify that the fields are cleared
    expect(nameField.value).toBe('');
    expect(commentField.value).toBe('');
  });
});

// https://vitest.dev/guide/mocking#functions

const initComment = (form, nameField, commentField, list) => {
  form.onsubmit = (e) => {
    e.preventDefault();

    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();

    // Basic validation to ensure both fields have input
    if (!nameValue || !commentValue) {
      alert("Please enter both your name and comment.");
      return;
    }

    const listItem = document.createElement("li");
    const namePara = document.createElement("p");
    const commentPara = document.createElement("p");

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    list.appendChild(listItem);

    nameField.value = "";
    commentField.value = "";
  };
};

export { initComment };

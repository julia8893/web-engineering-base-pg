const initComment = (form, nameField, commentField, list) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    var listItem = document.createElement("li");
    var namePara = document.createElement("p");
    var commentPara = document.createElement("p");
    var nameValue = nameField.value;
    var commentValue = commentField.value;

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = "";
    commentField.value = "";
  };
};

export { initComment };

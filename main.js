import { toggleComments, renderBearImages } from "./modules/ui.js";
import { initComment } from "./modules/comments.js";
import { getBearData } from "./modules/bears.js";

const initializeComments = () => {
  const showHideBtn = document.querySelector(".show-hide");
  const commentWrapper = document.querySelector(".comment-wrapper");

  if (showHideBtn && commentWrapper) {
    commentWrapper.style.display = "none";
    toggleComments(showHideBtn, commentWrapper);
  } else {
    console.warn("Comment toggle elements not found.");
  }
};

const initializeCommentForm = () => {
  const form = document.querySelector(".comment-form");
  const nameField = document.querySelector("#name");
  const commentField = document.querySelector("#comment");
  const list = document.querySelector(".comment-container");

  if (form && nameField && commentField && list) {
    initComment(form, nameField, commentField, list);
  } else {
    console.warn("Comment form elements not found.");
  }
};

const fetchAndDisplayBears = async () => {
  try {
    const bears = await getBearData();
    if (bears) {
      renderBearImages(bears);
    } else {
      console.warn("No bear data available to display.");
    }
  } catch (err) {
    console.error("Error fetching bear data:", err);
  }
};

const initializeWebApp = () => {
  initializeComments();
  initializeCommentForm();
  fetchAndDisplayBears();
};

initializeWebApp();

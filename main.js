import { toggleComments } from "./modules/ui.js";
import { initComment } from "./modules/comments.js";
import { getBearData } from "./modules/bears.js";

// functionality for showing/hiding the comments section

var showHideBtn = document.querySelector(".show-hide");
var commentWrapper = document.querySelector(".comment-wrapper");

commentWrapper.style.display = "none";

toggleComments(showHideBtn, commentWrapper);

// functionality for adding a new comment via the comments form

var form = document.querySelector(".comment-form");
var nameField = document.querySelector("#name");
var commentField = document.querySelector("#comment");
var list = document.querySelector(".comment-container");

initComment(form, nameField, commentField, list);

const fetchAndDisplayBears = async () => {
  const bears = await getBearData();
  // Only update the UI after all bears are processed
  renderBearImages(bears);
};

fetchAndDisplayBears();

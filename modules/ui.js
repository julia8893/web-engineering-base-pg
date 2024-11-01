import "../components/bear-card.js";

const toggleComments = (showHideBtn, commentWrapper) => {
  showHideBtn.addEventListener("click", () => {
    const isShowing = showHideBtn.textContent === "Hide comments";
    showHideBtn.textContent = isShowing ? "Show comments" : "Hide comments";
    commentWrapper.style.display = isShowing ? "none" : "block";
  });
};

const renderBearImages = (bears) => {
  if (!Array.isArray(bears) || bears.length === 0) {
    console.warn("No bear data available to render.");
    return;
  }

  const moreBearsSection = document.querySelector(".more_bears");
  moreBearsSection.innerHTML = "";

  bears.forEach(({ name, binomial, image, range }) => {
    const bearCard = document.createElement("bear-card");
    bearCard.setAttribute("name", name);
    bearCard.setAttribute("binomial", binomial);
    bearCard.setAttribute("image", image);
    bearCard.setAttribute("range", range);
    moreBearsSection.appendChild(bearCard);
  });
};

export { toggleComments, renderBearImages };

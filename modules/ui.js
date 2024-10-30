const toggleComments = (showHideBtn, commentWrapper) => {
  showHideBtn.onclick = () => {
    var showHideText = showHideBtn.textContent;
    if (showHideText == "Show comments") {
      showHideBtn.textContent = "Hide comments";
      commentWrapper.style.display = "block";
    } else {
      showHideBtn.textContent = "Show comments";
      commentWrapper.style.display = "none";
    }
  };
};

const renderBearImages = (bears) => {
  var moreBearsSection = document.querySelector(".more_bears");
  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
                    <div>
                        <h3>${bear.name} (${bear.binomial})</h3>
                        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                        <p><strong>Range:</strong> ${bear.range}</p>
                    </div>
                `;
  });
};

export { toggleComments, renderBearImages };

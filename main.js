// functionality for showing/hiding the comments section

var showHideBtn = document.querySelector(".show-hide");
var commentWrapper = document.querySelector(".comment-wrapper");

commentWrapper.style.display = "none";

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

// functionality for adding a new comment via the comments form

var form = document.querySelector(".comment-form");
var nameField = document.querySelector("#name");
var commentField = document.querySelector("#comment");
var list = document.querySelector(".comment-container");

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

// Function to fetch the image URLs based on the file names
var baseUrl = "https://en.wikipedia.org/w/api.php";
var title = "List_of_ursids";
const placeholderImage =
  "https://placehold.co/300x200?text=Bear+Image+Placeholder";

var params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*",
};

const fetchImageUrl = async (fileName) => {
  var imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*",
  };

  var url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch image information.");

    const data = await res.json();
    const pages = data.query.pages;
    const imageUrl = Object.values(pages)[0].imageinfo[0].url;
    return imageUrl || placeholderImage;
  } catch (err) {
    console.error("Error fetching image URL:", err);
    return placeholderImage;
  }
};

// Function to extract bear data from the wikitext
const extractBears = async (wikitext) => {
  try {
    const speciesTables = wikitext.split("{{Species table/end}}");
    let bearPromises = [];

    speciesTables.forEach((table) => {
      const rows = table.split("{{Species table/row");

      const rowPromises = rows.map(async (row) => {
        const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
        const binomialMatch = row.match(/\|binomial=(.*?)\n/);
        const imageMatch = row.match(/\|image=(.*?)\n/);

        if (nameMatch && binomialMatch && imageMatch) {
          const fileName = imageMatch[1].trim().replace("File:", "");

          // Fetch the image URL and handle the bear data
          const imageUrl = await fetchImageUrl(fileName);

          return {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: "TODO extract correct range",
          };
        }
        return null;
      });
      bearPromises = bearPromises.concat(rowPromises);
    });

    const bears = (await Promise.all(bearPromises)).filter(Boolean);
    console.log("Fetched bear data:", bears);

    // Only update the UI after all bears are processed
    renderBearImages(bears);
  } catch (err) {
    console.error("Error extracting bear data:", err);
  }
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

const getBearData = async () => {
  var url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch bear data.");

    const data = await res.json();
    const wikitext = data.parse.wikitext["*"];
    await extractBears(wikitext);
  } catch (err) {
    console.error("Error fetching bear data:", err);
  }
};

// Fetch and display the bear data
getBearData();

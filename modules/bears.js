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
        const rangeMatch = row.match(/\|range=([^|]*)/);

        if (nameMatch && binomialMatch && imageMatch) {
          const fileName = imageMatch[1].trim().replace("File:", "");

          // Fetch the image URL and handle the bear data
          const imageUrl = await fetchImageUrl(fileName);

          return {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch ? rangeMatch[1].trim() : "Range not available",
          };
        }
        return null;
      });
      bearPromises = bearPromises.concat(rowPromises);
    });

    const bears = (await Promise.all(bearPromises)).filter(Boolean);
    console.log("Fetched bear data:", bears);
  } catch (err) {
    console.error("Error extracting bear data:", err);
  }
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

export { getBearData };

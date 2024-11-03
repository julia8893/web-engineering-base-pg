const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const TITLE = 'List_of_ursids';
const PLACEHOLDER_IMAGE =
  'https://placehold.co/300x200?text=Bear+Image+Placeholder';

const PAGE_PARAMS = {
  action: 'parse',
  page: TITLE,
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};

// Interface for Bear data
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Interface for Wikipedia API response structure
interface WikipediaImageInfo {
  imageinfo?: { url: string }[];
}

interface WikipediaQueryResponse {
  query: {
    pages: { [key: string]: WikipediaImageInfo };
  };
}

interface WikipediaParseResponse {
  parse: {
    wikitext: { '*': string };
  };
}

// Helper function to construct a URL with parameters
const buildUrl = (
  base: string,
  params: Record<string, string | number>
): string => {
  const searchParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  return `${base}?${searchParams.toString()}`;
};

// Fetches the image URL based on the filename
const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  try {
    const response = await fetch(buildUrl(BASE_URL, imageParams));
    if (!response.ok) throw new Error('Failed to fetch image information.');

    const data: WikipediaQueryResponse = await response.json();
    const pages = data.query.pages;
    const imageUrl = Object.values(pages)[0]?.imageinfo?.[0]?.url;
    return imageUrl || PLACEHOLDER_IMAGE;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return PLACEHOLDER_IMAGE;
  }
};

// Extracts bear data from wikitext by parsing relevant fields
const extractBears = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bearPromises: Promise<Bear>[] = [];

  speciesTables.forEach((table) => {
    const rows = table.split('{{Species table/row');

    rows.forEach((row) => {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|}]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        bearPromises.push(
          fetchImageUrl(fileName).then((imageUrl) => ({
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch ? rangeMatch[1].trim() : 'Range not available',
          }))
        );
      }
    });
  });

  const bears = await Promise.all(bearPromises);
  return bears.filter(Boolean);
};

// Fetches and processes bear data from the Wikipedia API
const getBearData = async (): Promise<Bear[]> => {
  try {
    const response = await fetch(buildUrl(BASE_URL, PAGE_PARAMS));
    if (!response.ok) throw new Error('Failed to fetch bear data.');

    const data: WikipediaParseResponse = await response.json();
    const wikitext = data.parse.wikitext['*'];
    return await extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    return [];
  }
};

export { getBearData, fetchImageUrl, buildUrl, extractBears };

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBearData,
  fetchImageUrl,
  buildUrl,
  extractBears,
} from '.././src/modules/bears';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const PLACEHOLDER_IMAGE =
  'https://placehold.co/300x200?text=Bear+Image+Placeholder';

describe('Bear Data Module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('buildUrl', () => {
    // TEST 1
    it('should construct a URL with given parameters', () => {
      const params = { action: 'query', format: 'json' };
      const url = buildUrl(BASE_URL, params);
      expect(url).toBe(
        'https://en.wikipedia.org/w/api.php?action=query&format=json'
      );
    });
  });

  describe('fetchImageUrl', () => {
    // TEST 2
    it('should return the image URL from the Wikipedia API response', async () => {
      // Mock fetch to return a fake image URL
      const imageUrl = 'https://example.com/bear_image.jpg';
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          query: {
            pages: {
              '1': {
                imageinfo: [{ url: imageUrl }],
              },
            },
          },
        }),
      });

      const result = await fetchImageUrl('SomeImageFile.jpg');
      expect(result).toBe(imageUrl);
    });

    // TEST 3
    it('should return a placeholder image URL if the fetch fails', async () => {
      // Mock fetch to simulate a failure
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      const result = await fetchImageUrl('InvalidImageFile.jpg');
      expect(result).toBe(PLACEHOLDER_IMAGE);
    });
  });

  describe('extractBears', () => {
    // TEST 1
    it('should extract bear data from wikitext', async () => {
      // Mock fetchImageUrl to return a fixed image URL for testing
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          query: {
            pages: {
              '1': {
                imageinfo: [{ url: PLACEHOLDER_IMAGE }],
              },
            },
          },
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        redirected: false,
        status: 0,
        statusText: '',
        type: 'error',
        url: '',
        clone: function (): Response {
          throw new Error('Function not implemented.');
        },
        body: null,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error('Function not implemented.');
        },
        blob: function (): Promise<Blob> {
          throw new Error('Function not implemented.');
        },
        formData: function (): Promise<FormData> {
          throw new Error('Function not implemented.');
        },
        text: function (): Promise<string> {
          throw new Error('Function not implemented.');
        },
      });

      const wikitext = `
      {{Species table/row
      |name=[[Brown bear]] |binomial=U. arctos
      |image=File:Kamchatka Brown Bear near Dvuhyurtochnoe on 2015-07-23.jpg |image-size=180px |image-alt=Brown bear in river
      |authority-name=[[Carl Linnaeus|Linnaeus]] |authority-year=1758
      |subspecies={{Collapsible list |expand= |title=Sixteen subspecies |bullets=on
      | ''U. a. alascensis'' (Alaskan grizzly bear)
      | ''U. a. arctos'' ([[Eurasian brown bear]])
      | ''U. a. beringianus'' ([[Kamchatka brown bear]])
      | ''U. a. californicus'' ([[California grizzly bear]])
      | ''U. a. collaris'' ([[East Siberian brown bear]])
      | ''U. a. crowtheri'' ([[Atlas bear]]){{dagger|alt=Extinct}}
      | ''U. a. dalli'' (Dall Island brown bear)
      | ''U. a. gyas'' ([[Alaska Peninsula brown bear]])
      | ''U. a. horribilis'' ([[Grizzly bear]])
      | ''U. a. isabellinus'' ([[Himalayan brown bear]])
      | ''U. a. lasiotus'' ([[Ussuri brown bear]])
      | ''U. a. middendorffi'' ([[Kodiak bear]])
      | ''U. a. pruinosus'' ([[Tibetan blue bear]])
      | ''U. a. sitkensis'' ([[ABC Islands bear]])
      | ''U. a. stikeenensis'' ([[Stickeen brown bear]])
      | ''U. a. syriacus'' ([[Syrian brown bear]])
      }}
      |range=Northern North America and Europe, and northern and central Asia |range-image=File:Ursus arctos range map.svg |range-image-size=180px
      |size={{convert|100|–|280|cm|in|0|abbr=on}} long, plus {{convert|6|–|20|cm|in|0|abbr=on}} tail<br/>{{convert|80|–|550|kg|lb|0|abbr=on}}<ref name="Brownbearsize"/>
      |habitat=Desert, forest, inland wetlands, grassland, and shrubland<ref name="IUCNBrownbear"/>
      |hunting=Omnivorous; eats grasses, herbs, roots, berries, nuts, insects, mammals, and fish<ref name="IUCNBrownbear"/>
      |iucn-status=LC |population=110,000
      |direction={{steady|Population steady}}<ref name="IUCNBrownbear"/>
      }}
      {{Species table/end}}`;

      const bears = await extractBears(wikitext);

      expect(bears.length).toBe(1);
      expect(bears[0]).toEqual({
        name: 'Brown bear',
        binomial: 'U. arctos',
        image: PLACEHOLDER_IMAGE,
        range:
          'Northern North America and Europe, and northern and central Asia',
      });
    });
  });

  describe('getBearData', () => {
    // TEST 1
    it('should fetch bear data and extract it', async () => {
      // Mock fetch to return a fake response with wikitext
      const mockWikitext = `
      {{Species table/row
      |name=[[Polar bear]] |binomial=U. maritimus
      |image=File:Polar Bear - Alaska (cropped).jpg |image-size=179px |image-alt=White bear on snow
      |authority-name=[[Constantine Phipps, 2nd Baron Mulgrave|Mulgrave]] |authority-year=1774
      |range=Polar North America and Asia |range-image=File:Polar bear range map.png |range-image-size=180px
      |size={{convert|220|–|244|cm|in|0|abbr=on}} long, plus {{convert|7|–|13|cm|in|0|abbr=on}} tail<br/>{{convert|408|–|726|kg|lb|-1|abbr=on}}<ref name="Polarbearsize"/>
      |habitat=Marine oceanic, shrubland, forest, grassland, marine coastal/[[supralittoral zone|supratidal]], and [[intertidal zone|marine intertidal]]<ref name="IUCNPolarbear"/>
      |hunting=Primarily eats seals, as well as walruses, [[beluga whale]]s, birds, fish, vegetation and [[kelp]]<ref name="IUCNPolarbear"/>
      |iucn-status=VU |population=23,000<ref name="Polarbearpop"/>
      |direction={{population change unknown}}<ref name="IUCNPolarbear"/>
      }}
      {{Species table/end}}`;

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            parse: {
              wikitext: { '*': mockWikitext },
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            query: {
              pages: {
                '1': {
                  imageinfo: [{ url: PLACEHOLDER_IMAGE }],
                },
              },
            },
          }),
        });

      const bears = await getBearData();

      expect(bears.length).toBe(1);
      expect(bears[0]).toEqual({
        name: 'Polar bear',
        binomial: 'U. maritimus',
        image: PLACEHOLDER_IMAGE,
        range: 'Polar North America and Asia',
      });
    });

    // TEST 2
    it('should return an empty array if the fetch fails', async () => {
      // Mock fetch to simulate a failure
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      const bears = await getBearData();
      expect(bears).toEqual([]);
    });
  });
});

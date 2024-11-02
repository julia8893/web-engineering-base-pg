class BearCard extends HTMLElement {
  name?: string;
  binomial?: string;
  image?: string;
  range?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['name', 'binomial', 'image', 'range'];
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      // Cast attrName to match the properties on BearCard
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[attrName] = newValue || undefined;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './style.css';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div class="bear-card">
          <h3>
            ${this.name || 'Unknown'} (${this.binomial || 'Unknown'})
          </h3>
          <img class="bear-card" src="${this.image || ''}" alt="${
            this.name || 'Bear'
          }" />
          <p>
            <strong>Range:</strong> ${this.range || 'Unknown'}
          </p>
        </div>
      `;

      this.shadowRoot.appendChild(link);
    }
  }
}

// Register the Web Component
customElements.define('bear-card', BearCard);

export { BearCard };

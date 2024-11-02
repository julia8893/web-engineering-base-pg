class BearCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["name", "binomial", "image", "range"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./style.css";

    this.shadowRoot.innerHTML = `
      <div class="bear-card">
        <h3>
          ${this.name} (${this.binomial})
        </h3>
        <img class="bear-card" src="${this.image}" alt="${this.name}" />
        <p>
          <strong>Range:</strong> ${this.range}
        </p>
      </div>
    `;

    this.shadowRoot.appendChild(link);
  }
}

// Register the Web Component
customElements.define("bear-card", BearCard);

export { BearCard };

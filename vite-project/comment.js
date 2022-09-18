class MyComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    // Get our component template from the DOM and ad it to the shadow root
    const template = document.querySelector('#comment').content.cloneNode(true);
    shadow.append(template);

    // Get the elements from the shadow root where our content will be rendered
    this._name = this.shadowRoot.querySelector('.comment--name');
    this._email = this.shadowRoot.querySelector('.comment--email');
    this._body = this.shadowRoot.querySelector('.comment--body');
    this._time = this.shadowRoot.querySelector('.comment--time');
  }

  // Declare what attributes you want to listen for changes to
  static get observedAttributes() {
    return ['name', 'email', 'body', 'time'];
  }

  //  Called when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    // If nothing's changed, don't continue
    if (oldValue === newValue) return;

    // Check if the changed attribute has a matching area to render the content
    if (this[`_${name}`]) {
      this[`_${name}`].textContent = newValue;
    }
  }
}

// Check to see if the custom element is defined
if (customElements.get('my-comment') === undefined) {
  // If not, define the custom element
  customElements.define('my-comment', MyComponent);
}
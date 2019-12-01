import { LitElement, html, css } from 'lit-element'
import { images } from './images'

export class Galleria extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: grid;
          grid-template-columns: repeat() (4, 1fr);
          grid-template-rows: repeat() (2, 1fr);
          grid-template-areas:
            'large large small1 small2'
            'large large small3 small4';
        }

        img {
          width: 100%;
          height: 100%;
        }

        img:nth-child(1) {
          grid-area: large;
        }
        img:nth-child(2) {
          grid-area: small1;
        }
        img:nth-child(3) {
          grid-area: small2;
        }
        img:nth-child(4) {
          grid-area: small3;
        }
        img:nth-child(5) {
          grid-area: small4;
        }
      `
    ]
  }

  static get properties() {
    return {}
  }

  render() {
    var collection = images.slice(0, 5)

    return html`
      ${collection.map(
        (piece, idx) => html`
          <img src=${piece} />
        `
      )}
    `
  }
}

customElements.define('galleri-a', Galleria)

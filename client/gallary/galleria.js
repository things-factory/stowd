import { LitElement, html, css } from 'lit-element'
import { images } from './images'

export class Galleria extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        [collection] {
          flex: 1;

          list-style: none;
        }

        [piece] {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 100%;
        }

        [front] {
          z-index: 1;
        }

        [control] {
          position: absolute;
          width: 100%;
          bottom: 0;
          z-index: 10;
          text-align: center;
        }
      `
    ]
  }

  static get properties() {
    return {
      front: Number
    }
  }

  render() {
    if (this.front === undefined) {
      this.front = 0
    }

    var collection = images

    return html`
      <ul collection>
        ${collection.map(
          (piece, idx) => html`
            <li piece ?front=${idx == this.front}><img src=${piece} /></li>
          `
        )}
      </ul>

      <span backward @click=${e => (this.front = --this.front % collection.length)}><</span>
      <span forward @click=${e => (this.front = ++this.front % collection.length)}>></span>

      <div control>
        <span backward @click=${e => (this.front = --this.front % collection.length)}><</span>
        ${collection.map(
          (piece, idx) => html`
            <span @click=${e => (this.front = idx)}>o</span>
          `
        )}
        <span forward @click=${e => (this.front = ++this.front % collection.length)}>></span>
      </div>
    `
  }
}

customElements.define('galleri-a', Galleria)

import { LitElement, html, css } from 'lit-element'
import { images } from './images'

export class ImageSliderPopup extends LitElement {
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

        [like],
        [backward],
        [forward] {
          position: absolute;
          z-index: 10;
          width: 20px;
          height: 20px;
          padding: 5px;
          border-radius: 50%;
          background-color: white;
          font-size: 1.3em;
          transition: opacity 0.3s ease-in;
        }

        [like] {
          top: 5%;
          left: 5%;
          opacity: 0.8;
        }

        [forward],
        [backward] {
          opacity: 0;
          top: 50%;
          transform: translate(0, -50%);
        }

        [backward] {
          left: 5%;
        }

        [forward] {
          right: 5%;
        }

        :host(:hover) [backward] {
          display: unset;
          opacity: 0.8;
        }

        :host(:hover) [forward] {
          display: unset;
          opacity: 0.8;
        }

        [like]:hover,
        :host(:hover) [forward]:hover,
        :host(:hover) [backward]:hover {
          opacity: 1;
        }

        [control] {
          position: absolute;
          width: 100%;
          bottom: 0;
          z-index: 10;
          text-align: center;
        }

        [control] mwc-icon {
          font-size: 0.1em;
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

      <mwc-icon like @click=${e => this.onLike(e)}>favorite_border</mwc-icon>
      <mwc-icon backward @click=${e => this.onBackward(e, collection)}>chevron_left</mwc-icon>
      <mwc-icon forward @click=${e => this.onForward(e, collection)}>chevron_right</mwc-icon>

      <div control>
        ${collection.map(
          (piece, idx) => html`
            <mwc-icon>${this.front == idx ? 'lens' : 'radio_button_unchecked'}</mwc-icon>
          `
        )}
      </div>
    `
  }

  onForward(e, collection) {
    this.front = ++this.front % collection.length

    e.stopPropagation()
  }

  onBackward(e, collection) {
    this.front = (--this.front + collection.length) % collection.length

    e.stopPropagation()
  }

  onLike(e) {
    console.log('i like..')

    e.stopPropagation()
  }
}

customElements.define('image-slider-popup', ImageSliderPopup)

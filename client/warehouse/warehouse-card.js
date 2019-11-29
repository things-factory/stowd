import { LitElement, html, css } from 'lit-element'
import '../gallary/galleria'

export class WarehouseCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
        }

        galleri-a {
          margin: 5px;
          width: 300px;
          height: 200px;
        }

        [rate] {
          position: absolute;
          display: flex;
          align-items: center;
          font-size: 0.8em;
          top: 0;
          right: 0;
        }

        [info] {
          flex: 1;
        }

        [note] {
          font-size: 1em;
          font-weight: bold;
        }

        [brief] {
          font-size: 1.3em;
        }

        [desc] {
          font-size: 1em;
        }

        mwc-icon {
          font-size: 1em;
          color: red;
        }
      `
    ]
  }

  static get properties() {
    return {}
  }

  render() {
    return html`
      <galleri-a></galleri-a>
      <div info>
        <div note>[super partner] cold storage</div>
        <div brief>Blah Blah Blah Blah Blah Blah</div>
        <div desc>Blah Blah Blah Blah Blah Blah</div>
        <div desc>Blah Blah Blah Blah Blah Blah</div>
      </div>
      <div rate>
        <mwc-icon>star</mwc-icon>
        <span>4.70(203)</span>
      </div>
    `
  }
}

customElements.define('warehouse-card', WarehouseCard)

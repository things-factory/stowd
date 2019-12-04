import { LitElement, html, css } from 'lit-element'

class Header extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        height: 100px;
        place-content: center;
        margin: 0 10px;
      }

      :host > * {
        margin: 0 10px;
      }

      span {
        align-self: center;
      }

      [fill] {
        flex: auto;
      }

      button {
        align-self: center;
      }
    `
  }

  render() {
    return html`
      <span>Stowd</span>
      <span fill></span>
      <span>Warehouse Locations</span>
      <span>Services</span>
      <span>Company</span>
      <span>List Your Warehouse</span>
      <button>GET STARTED</button>
      <button>SIGN IN</button>
    `
  }
}

customElements.define('partial-header', Header)

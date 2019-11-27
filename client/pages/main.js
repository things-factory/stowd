import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import './locations/location-map'

class StowdMain extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          overflow-y: auto;
        }

        location-map {
          height: 600px;
        }

        div {
          height: 300px;
        }
      `
    ]
  }
  static get properties() {
    return {
      stowd: String
    }
  }

  render() {
    return html`
      <location-map> </location-map>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
      <div>BOXES</div>
    `
  }

  stateChanged(state) {}
}

window.customElements.define('stowd-main', StowdMain)

import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import './locations/location-map'
import '../gallary/galleria'

class StowdMain extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
          overflow-y: auto;
        }

        [galleries] {
          width: 45%;
          padding: 30px;
        }

        [map] {
          position: relative;
          width: 55%;
        }

        galleri-a {
          margin: 20px;
          width: 300px;
          height: 200px;
        }

        location-map {
          position: sticky;
          top: 0;
          width: 55%;
          height: 100%;
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
      <div galleries>
        <galleri-a></galleri-a>
        <galleri-a></galleri-a>
        <galleri-a></galleri-a>
        <galleri-a></galleri-a>
        <galleri-a></galleri-a>
        <galleri-a></galleri-a>
      </div>
      <location-map> </location-map>
    `
  }

  stateChanged(state) {}
}

window.customElements.define('stowd-main', StowdMain)

import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, navigate, PageView } from '@things-factory/shell'

class AssetsStatus extends connect(store)(PageView) {
  static get styles() {
    return [css``]
  }

  static get properties() {
    return {}
  }

  render() {
    return html``
  }

  pageUpdated(changes) {}

  stateChanged(state) {}
}

customElements.define('assets-status', AssetsStatus)

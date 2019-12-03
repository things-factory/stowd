import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, PageView } from '@things-factory/shell'

export class WarehouseStatus extends connect(store)(PageView) {
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

customElements.define('warehouse-status', WarehouseStatus)

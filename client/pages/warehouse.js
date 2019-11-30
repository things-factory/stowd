import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, PageView } from '@things-factory/shell'

import '../gallary/galleria'

export class WarehousePage extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          overflow-y: auto;
        }

        galleri-a {
          height: 360px;
        }
      `
    ]
  }

  static get properties() {
    return {
      warehouse: Object
    }
  }

  render() {
    var warehouse = this.warehouse || {}

    return html`
      <galleri-a></galleri-a>
      <div slogan>general contracter</div>
      <div name>${warehouse.name}</div>
      <div description>${warehouse.description}</div>
    `
  }

  pageInitialized(changes) {
    console.log(changes)
  }

  async pageUpdated(changes, lifecycle) {
    var name = this.lifecycle.resourceId
    var response = await client.query({
      query: gql`
        query bizplace($name: String!) {
          bizplace(name: $name) {
            id
            name
            description
            address
            postalCode
            latlng
            status
            company {
              id
              name
              description
              postalCode
              brn
              address
              status
            }
            contactPoints {
              name
              description
              email
              fax
              phone
            }
          }
        }
      `,
      variables: { name }
    })

    if (!response.errors) {
      this.warehouse = response.data.bizplace
    }
  }
}

customElements.define('warehouse-page', WarehousePage)

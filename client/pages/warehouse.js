import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, PageView } from '@things-factory/shell'

import '../gallary/galleria'
import '../warehouse/contact-card'
import '../board/board-player'

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

        [main] {
          display: flex;
        }

        [left] {
          flex: 2;
          margin: 20px;
        }

        [right] {
          flex: 1;
          margin: 20px;
        }

        stowd-board-player {
          background-color: yellow;
          height: 300px;
        }
      `
    ]
  }

  static get properties() {
    return {
      warehouse: Object,
      boards: Array
    }
  }

  get context() {
    return {
      actions: [
        {
          type: 'link',
          title: 'goto warehouses..',
          href: 'warehouses'
        },
        {
          type: 'text',
          title: 'From RM594/pallet'
        },
        {
          type: 'button' /* default type */,
          icon: 'eco',
          title: 'check availability',
          action: () => console.log('check availability..')
        }
      ]
    }
  }

  render() {
    var warehouse = this.warehouse || {
      latlng: '0,0'
    }
    var contact = (warehouse.contactPoints || [])[0] || {}
    var [lat, lng] = warehouse.latlng.split(',').map(pos => Number(pos))
    var position = { lat, lng }

    return html`
      <galleri-a></galleri-a>
      <div main>
        <div left>
          <div slogan>general contracter</div>
          <div name>${warehouse.name}</div>
          <div description>${warehouse.description}</div>
          <stowd-board-player .playGroupId=${'2b351372-4f13-4f23-aa8e-eedbc7c94d01'}></stowd-board-player>
        </div>
        <contact-card
          .name=${warehouse.name}
          .position=${position}
          .address=${warehouse.address}
          .postalCode=${warehouse.postalCode}
          right
        >
        </contact-card>
      </div>
    `
  }

  pageInitialized(changes) {
    console.log(changes)
  }

  fetchBoards() {}

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

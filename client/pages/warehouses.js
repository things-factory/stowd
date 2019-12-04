import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, navigate, PageView } from '@things-factory/shell'
import { UPDATE_BIZPLACES, UPDATE_SEARCH_MAP } from '../actions/search'

import '../locations/location-map'
import '../warehouse/warehouse-card'

import { ICONS, FOCUS_ICON } from '../locations/marker-icons'
const SCALED_SIZE = { width: 30, height: 30 }

class WarehousesPage extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
          overflow-y: auto;
        }

        [galleries] {
          width: 680px;
        }

        warehouse-card {
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: lightgray solid 1px;
        }

        warehouse-card:hover {
          cursor: pointer;
        }

        location-map {
          position: sticky;
          top: 0;
          flex: 1;
          height: 100%;
        }
      `
    ]
  }

  static get properties() {
    return {
      bizplaces: Array,
      warehouses: Array,
      focused: Object
    }
  }

  render() {
    var warehouses = this.warehouses || []
    return html`
      <div galleries>
        ${warehouses.map(
          warehouse =>
            html`
              <warehouse-card
                .name=${warehouse.name}
                .position=${warehouse.position}
                @mouseenter=${e => this.onWarehouseCardMouseEnter(e)}
                @mouseleave=${e => this.onWarehouseCardMouseLeave(e)}
                @click=${e => navigate(`warehouse/${warehouse.name}`)}
              ></warehouse-card>
            `
        )}
      </div>
      <location-map
        .locations=${warehouses}
        .focused=${this.focused}
        @map-change=${e =>
          store.dispatch({
            type: UPDATE_SEARCH_MAP,
            map: e.detail
          })}
      >
      </location-map>
    `
  }

  onWarehouseCardMouseEnter(e) {
    var { name, position } = e.target
    this.focused = {
      name,
      position,
      icon: {
        url: FOCUS_ICON,
        scaledSize: SCALED_SIZE
      }
    }
  }

  onWarehouseCardMouseLeave(e) {
    this.focused = null
  }

  async pageInitialized() {
    var response = await client.query({
      query: gql`
        query {
          bizplaces {
            items {
              id
              name
              description
              latlng
            }
            total
          }
        }
      `
    })

    if (!response.errors) {
      store.dispatch({
        type: UPDATE_BIZPLACES,
        bizplaces: response.data.bizplaces.items
      })
    }
  }

  updated(changes) {
    if (changes.has('bizplaces')) {
      this.warehouses = (this.bizplaces || []).map(bizplace => {
        var [lat, lng] = bizplace.latlng.split(',').map(pos => Number(pos))

        return {
          name: bizplace.name,
          position: { lat, lng },
          icon: {
            url: ICONS[Math.round(Math.random() * 100) % 6],
            scaledSize: SCALED_SIZE
          },
          title: bizplace.name,
          get content() {
            var cards = document.createElement('WAREHOUSE-CARD')
            cards.name = this.name
            cards.position = this.position

            return cards
          }
        }
      })
    }
  }

  pageUpdated(changes) {}

  stateChanged(state) {
    this.bizplaces = state.search.bizplaces
  }
}

customElements.define('warehouses-page', WarehousesPage)

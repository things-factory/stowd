import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, PageView } from '@things-factory/shell'
import { UPDATE_BIZPLACES } from '../actions/search'

import '../locations/location-map'
import '../warehouse/warehouse-card'

import { ICONS } from '../locations/marker-icons'

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
          width: 680px;
        }

        warehouse-card {
          margin: 20px;
          border-bottom: lightgray solid 1px;
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
      locations: Array
    }
  }

  render() {
    return html`
      <div galleries>
        <warehouse-card></warehouse-card>
        <warehouse-card></warehouse-card>
        <warehouse-card></warehouse-card>
        <warehouse-card></warehouse-card>
        <warehouse-card></warehouse-card>
        <warehouse-card></warehouse-card>
      </div>
      <location-map .locations=${this.locations}> </location-map>
    `
  }

  async pageInitialized() {
    console.log('pageInitialized....')
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
      this.locations = this.bizplaces.map(bizplace => {
        var [lat, lng] = bizplace.latlng.split(',').map(pos => Number(pos))
        return {
          position: { lat, lng },
          icon: {
            url: ICONS[Math.round(Math.random() * 100) % 6],
            scaledSize: new google.maps.Size(30, 30)
          },
          title: bizplace.name,
          label: {
            text: bizplace.name,
            color: 'navy',
            fontSize: '1.2em'
            // fontFamily: '',
            // fontWeight: 'bold'
          }
        }
      })
    }
  }

  stateChanged(state) {
    this.bizplaces = state.search.bizplaces
  }
}

window.customElements.define('stowd-main', StowdMain)

import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import gql from 'graphql-tag'
import { client, store, PageView } from '@things-factory/shell'
import { UPDATE_BIZPLACES } from '../actions/search'

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
      bizplaces: Array,
      locations: Array
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

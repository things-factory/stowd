import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { UPDATE_BIZPLACES } from '../actions/search'

import '@material/mwc-textfield'

import GoogleMapLoader from '../google-map-loader'

export class SearchInput extends connect(store)(LitElement) {
  static get styles() {
    return [
      css`
        mwc-textfield.left {
          --mdc-notched-outline-leading-width: 28px;
          --mdc-notched-outline-leading-border-radius: 28px 0 0 28px;
        }

        mwc-textfield.right {
          --mdc-notched-outline-trailing-border-radius: 0 28px 28px 0;
        }
      `
    ]
  }

  static get properties() {
    return {
      map: Object
    }
  }

  render() {
    return html`
      <mwc-textfield id="search" class="left right" label="검색어를 입력하세요." iconTrailing="search" outlined>
      </mwc-textfield>
    `
  }

  get searchInput() {
    if (!this._searchInput) {
      this._searchInput = this.shadowRoot.querySelector('#search')
    }
    return this._searchInput
  }

  async firstUpdated() {
    await GoogleMapLoader.load()

    var input = this.searchInput
    var options = {
      types: ['establishment']
    }

    // this.autocomplete = new google.maps.places.Autocomplete(input, options)
    // var defaultBounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(-33.8902, 151.1759),
    //   new google.maps.LatLng(-33.8474, 151.2631)
    // )
    this.searchBox = new google.maps.places.SearchBox(input, {
      /* bounds: defaultBounds */
    })

    this.searchBox.addListener('places_changed', this.onPlaceChanged.bind(this))
  }

  onPlaceChanged() {
    var bizplaces = this.searchBox.getPlaces()

    if (bizplaces.length == 0) {
      return
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds()
    bizplaces.forEach(function(bizplace) {
      if (!bizplace.geometry) {
        console.log('Returned place contains no geometry')
        return
      }

      // var icon = {
      //   url: bizplace.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // }

      // Create a marker for each place.
      // markers.push(
      //   new google.maps.Marker({
      //     map: map,
      //     icon: icon,
      //     title: bizplace.name,
      //     position: bizplace.geometry.location
      //   })
      // )

      if (bizplace.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(bizplace.geometry.viewport)
      } else {
        bounds.extend(bizplace.geometry.location)
      }
    })

    this.map && this.map.fitBounds(bounds)

    store.dispatch({
      type: UPDATE_BIZPLACES,
      bizplaces: bizplaces.map(bizplace => {
        var location = bizplace.geometry.location

        return {
          id: bizplace.name,
          name: bizplace.name,
          description: bizplace.name,
          latlng: `${location.lat()}, ${location.lng()}`
        }
      })
    })
  }

  stateChanged(state) {
    this.map = state.search.map
  }
}

customElements.define('search-input', SearchInput)

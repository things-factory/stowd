import { LitElement, html, css } from 'lit-element'

import ScriptLoader from './script-loader'

export class LocationMap extends LitElement {
  static async load() {
    if (LocationMap.loaded) {
      return
    }
    var key = 'AIzaSyBgQZb-SFqjQBC_XTxNiz0XapejNwV9PgA'

    await ScriptLoader.load('https://maps.googleapis.com/maps/api/js' + (key ? '?key=' + key : ''))
    LocationMap.loaded = true
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        [map] {
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      loaded: Boolean,
      lat: Number,
      lng: Number,
      zoom: Number,
      map: Object,
      locations: Array
    }
  }

  get anchor() {
    return this.shadowRoot.querySelector('[map]')
  }

  async firstUpdated() {
    await LocationMap.load()

    var show = (lat, lng, zoom) => {
      const position = { lat, lng }

      try {
        const map = new google.maps.Map(this.anchor, {
          zoom,
          center: position
        })

        this.map = map
      } catch (e) {
        console.error(e)
      }
    }

    var { lat, lng, zoom = 12 } = this

    if ((isNaN(lat) || isNaN(lng)) && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => show(position.coords.latitude, position.coords.longitude, zoom),
        err => alert(`Error (${err.code}): ${err.message}`)
      )
    } else {
      show(lat || 0, lng || 0, zoom)
    }
  }

  async buildMarkers(locations) {
    await LocationMap.load()

    if (this.markers) {
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
    }

    this.markers = locations.map(
      location =>
        new google.maps.Marker({
          ...location,
          map: this.map
        })
    )
  }

  updated(changes) {
    if (changes.has('locations') && LocationMap.loaded) {
      this.buildMarkers(this.locations)
    }
  }

  render() {
    return html`
      <div map></div>
    `
  }
}

customElements.define('location-map', LocationMap)

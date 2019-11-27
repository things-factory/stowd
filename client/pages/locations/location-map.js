import { LitElement, html, css } from 'lit-element'

import ScriptLoader from './script-loader'

export class LocationMap extends LitElement {
  static load(callback) {
    var key = 'AIzaSyBgQZb-SFqjQBC_XTxNiz0XapejNwV9PgA'

    ScriptLoader.load('https://maps.googleapis.com/maps/api/js' + (key ? '?key=' + key : '')).then(
      () => callback(),
      console.error
    )
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
      marker: Object
    }
  }

  get anchor() {
    return this.shadowRoot.querySelector('[map]')
  }

  firstUpdated() {
    LocationMap.load(() => {
      this.loaded = true

      var show = (lat, lng, zoom) => {
        const position = { lat, lng }

        try {
          const map = new google.maps.Map(this.anchor, {
            zoom,
            center: position
          })

          const marker = new google.maps.Marker({
            map,
            position
          })

          this.map = map
          this.marker = marker
        } catch (e) {
          console.error(e)
        }
      }

      var { lat, lng, zoom = 8 } = this

      if ((isNaN(lat) || isNaN(lng)) && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => show(position.coords.latitude, position.coords.longitude, zoom),
          err => alert(`Error (${err.code}): ${err.message}`)
        )
      } else {
        show(lat || 0, lng || 0, zoom)
      }
    })
  }

  render() {
    return html`
      <div map></div>
    `
  }
}

customElements.define('location-map', LocationMap)

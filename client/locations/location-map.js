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
      locations: Array,
      focused: Object
    }
  }

  get anchor() {
    return this.shadowRoot.querySelector('[map]')
  }

  async readyMap() {
    await LocationMap.load()

    if (this.map) {
      return
    }

    var show = (lat, lng, zoom) => {
      const position = { lat, lng }

      try {
        const map = new google.maps.Map(this.anchor, {
          zoom,
          center: position
        })

        this.markers.forEach(marker => marker.setMap(map))

        this.map = map
      } catch (e) {
        console.error(e)
      }
    }

    var { lat, lng, zoom = 10 } = this

    if ((isNaN(lat) || isNaN(lng)) && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => show(position.coords.latitude, position.coords.longitude, zoom),
        err => alert(`Error (${err.code}): ${err.message}`)
      )
    } else {
      show(lat || 0, lng || 0, zoom)
    }
  }

  async firstUpdated() {
    await this.readyMap()
  }

  async buildMarkers(locations) {
    await this.readyMap()

    if (this.markers) {
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
    }

    this.markers = locations.map(location => {
      let marker = new google.maps.Marker({
        ...location,
        map: this.map
      })

      google.maps.event.addListener(marker, 'click', e => {
        if (location.content) {
          var infowindow = this.infoWindow
          infowindow.open(this.map, marker)
          infowindow.setContent(location.content)
        }
      })

      return marker
    })
  }

  get infoWindow() {
    if (!this._infoWindow) {
      this._infoWindow = new google.maps.InfoWindow({
        content: 'loading...'
      })
    }

    return this._infoWindow
  }

  setFocus(focus, icon) {
    focus.setZIndex(1)
    focus.setIcon(icon)
  }

  resetFocus(focus, icon) {
    focus.setZIndex(0)
    focus.setIcon(icon)
  }

  async changeFocus(after, before) {
    await this.readyMap()

    if (before) {
      var idx = this.locations.findIndex(
        location =>
          location.name == before.name &&
          location.position.lat == before.position.lat &&
          location.position.lng == before.position.lng
      )
      idx !== -1 && this.markers && this.resetFocus(this.markers[idx], this.locations[idx].icon)
    }

    if (after) {
      var idx = this.locations.findIndex(
        location =>
          location.name == after.name &&
          location.position.lat == after.position.lat &&
          location.position.lng == after.position.lng
      )
      idx !== -1 && this.markers && this.setFocus(this.markers[idx], after.icon)
    }
  }

  updated(changes) {
    if (changes.has('locations')) {
      this.buildMarkers(this.locations)
    }

    if (changes.has('focused')) {
      this.changeFocus(this.focused, changes.get('focused'))
    }
  }

  render() {
    return html`
      <div map></div>
    `
  }
}

customElements.define('location-map', LocationMap)

import { LitElement, html, css } from 'lit-element'
import '../gallary/image-slider'
import '../locations/location-map'
import { ICONS, FOCUS_ICON } from '../locations/marker-icons'
const SCALED_SIZE = { width: 30, height: 30 }

export class ContactCard extends LitElement {
  static get styles() {
    return [
      css`
        location-map {
          height: 320px;
        }

        mwc-icon {
          font-size: 1em;
          color: red;
        }
      `
    ]
  }

  static get properties() {
    return {
      name: String,
      position: Object /* {lat, lng} */,
      address: String,
      phone: String,
      homepage: String,
      postalCode: String
    }
  }

  render() {
    return html`
      <location-map .locations=${[this.location]} .lat=${this.position.lat} .lng=${this.position.lng}> </location-map>
      <div location>
        <mwc-icon>room</mwc-icon>
        <span>${this.address}</span>
        <a href="https://www.google.com/maps/search/?api=1&query=${this.name}" target="_blank">위치 안내</a>
      </div>
      <div phone>
        <mwc-icon>phone</mwc-icon>
        <span>${this.phone}</span>
        <a href="tel:+${this.phone}">전화 걸기</a>
      </div>
      <div www>
        <mwc-icon>language</mwc-icon>
        <span>${this.homepage}</span>
      </div>
      <div biztime>
        <mwc-icon>timelapse</mwc-icon>
        <span>영업 중 · 영업 종료 시간: 6:00 PM</span>
        <span biztime>시간 보기</span>
      </div>
      <pre>
      Monday ‑ Sunday 10:00 AM ‑ 6:00 PM
      Monday ‑ Friday 9:00 AM ‑ 6:00 PM
      </pre
      >
    `
  }

  updated(changes) {
    this.location = {
      name: this.name,
      position: this.position,
      icon: {
        url: ICONS[Math.round(Math.random() * 100) % 6],
        scaledSize: SCALED_SIZE
      }
    }
  }
}

customElements.define('contact-card', ContactCard)

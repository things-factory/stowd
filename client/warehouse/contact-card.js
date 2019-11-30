import { LitElement, html, css } from 'lit-element'
import '../gallary/image-slider'
import '../locations/location-map'

export class ContactCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
        }

        image-slider {
          margin: 5px;
          width: 300px;
          height: 200px;
        }

        [rate] {
          position: absolute;
          display: flex;
          align-items: center;
          font-size: 0.8em;
          top: 10px;
          right: 0;
        }

        [info] {
          flex: 1;
        }

        [note] {
          font-size: 1em;
          font-weight: bold;
        }

        [brief] {
          font-size: 1.3em;
        }

        [desc] {
          font-size: 1em;
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
      position: Object /* {lat, lng} */
    }
  }

  render() {
    return html`
      <location-map .locations=${this.location} .focused=${this.focused}> </location-map>
      <div location>
        <mwc-icon>room</mwc-icon>
        <pre>${this.address}</pre>
        <a href="https://www.google.com/maps/search/?api=1&query=${this.address}" target="_blank">위치 안내</a>
      </div>
      <div phone>
        <mwc-icon>phone</mwc-icon>
        <pre>${this.phone}</pre>
        <a href="tel:+${this.phone}">전화 걸기</a>
      </div>
      <div www>
        <mwc-icon>language</mwc-icon>
        <pre>${this.phone}</pre>
        <a href="tel:+${this.phone}">전화 걸기</a>
      </div>
      <div biztime>
        <mwc-icon>timelapse</mwc-icon>
        <pre>영업 중 · 영업 종료 시간: 6:00 PM</pre>
        <div biztime>시간 보기</div>
      </div>
    `
  }
}

customElements.define('warehouse-card', ContactCard)

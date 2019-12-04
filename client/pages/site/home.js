import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import './partials/header'

class SiteHome extends connect(store)(PageView) {
  static get styles() {
    return css`
      :host {
        overflow-y: auto;
      }

      [row-2],
      [row-4] {
        display: flex;
        margin: 20px;
      }

      [row-2] > * {
        width: 50%;
        margin: 10px;
      }

      [row-4] > * {
        width: 25%;
        margin: 10px;
      }

      [grid4-2] {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }

      [block] {
        padding: 10px;
      }
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  render() {
    return html`
      <partial-header></partial-header>
      <div row-2>
        <div>
          <h1>MODERN WAREHOUSING AND FULFILLMENT</h1>
          <h3>Low prices. No long term commitments.</h3>
          <div>
            A national on-demand warehousing and fulfillment network enabling one and two-day delivery for businesses of
            all sizes.
          </div>
          <button>get started</button>
        </div>
        <iframe width="420" height="315" src="https://www.youtube.com/embed/eku1ED66DHE"> </iframe>
      </div>

      <div row-4>
        <h2>Simple and easy warehousing and fulfillment with Flowspace:</h2>
        <img
          src="https://www.flow.space/assets/temp/list-image-gallery-f8c2ed73c812c24aae6b5ca080b8de57acd7ab26e46e9bae09b7a7852de2b44c.jpg"
        />
        <img
          src="https://www.flow.space/assets/temp/list-image-gallery-2-7696b22ebbea7b9bf614d05d094a4a4c69e1aeb01f4929ec669f9076e6eaf63c.jpg"
        />
        <img
          src="https://www.flow.space/assets/temp/list-image-gallery-3-cd2744b8b76bd8b4eb90a272e976000b4a3275b237ce9838ac47078ee74a9138.jpg"
        />
      </div>

      <div block>
        <h2>Traditional Warehousing and Fulfillment vs. Flowspace</h2>
        <span
          >On-demand warehousing and fulfillment with Flowspace gets you up and running quickly without hassles or high
          costs
        </span>
        <div row-2>
          <div>
            <h3>TRADITIONAL WAREHOUSING & FULFILLMENT</h3>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
          </div>
          <div>
            <h3>FLOWSPACE WAREHOUSING & FULFILLMENT</h3>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
            <div>
              <h3>Long Term Commitments</h3>
              <span>Sign multi-year leases or contracts</span>
            </div>
          </div>
        </div>
      </div>

      <div grid4-2>
        <h2 style="grid-row-start: 1;grid-row-end: 3;">
          All Kinds Of Businesses Use Flowspace
        </h2>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
        <div>
          <img
            src="https://www.flow.space/assets/amazon-icon-7084d2359b677d4f170ce237b6c81fb6997d4af84c9d75096aedb81a0c6c695e.svg"
          />
          <h3>Amazon Sellers</h3>
          <div>Manage your items for Amazon FBA at a fraction of the cost.</div>
          <a href="/">Learn More...</a>
        </div>
      </div>
    `
  }
}

customElements.define('site-home', SiteHome)

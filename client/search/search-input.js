import { LitElement, html, css } from 'lit-element'
import '@material/mwc-textfield'

import GoogleMapLoader from '../google-map-loader'

export class SearchInput extends LitElement {
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

    var autocomplete = new google.maps.places.Autocomplete(input, options)
    var searchBox = new google.maps.places.SearchBox(input, {})
  }
}

customElements.define('search-input', SearchInput)

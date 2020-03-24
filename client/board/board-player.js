import { LitElement, html, css } from 'lit-element'
import { client, store } from '@things-factory/shell'
import gql from 'graphql-tag'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { provider } from '@things-factory/board-ui'
import './things-scene-components.import'

const NOOP = () => {}

export class BoardPlayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      playGroupId: String,
      _playGroup: Object,
      _boards: Array,
      _provider: Object,
      _baseUrl: String,
      _showSpinner: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          overflow: hidden;
          position: relative;
        }

        board-player {
          flex: 1;
        }

        oops-spinner {
          display: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        oops-spinner[show] {
          display: block;
        }

        oops-note {
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `
    ]
  }

  async refresh() {
    if (!this.playGroupId) {
      return
    }

    console.log('playgroupid', this.playGroupId)

    try {
      this._showSpinner = true

      this._playGroup = (
        await client.query({
          query: gql`
            query FetchPlayGroup($id: String!) {
              playGroup(id: $id) {
                id
                name
                description
                boards {
                  id
                  name
                  description
                  model
                  thumbnail
                  createdAt
                  creator {
                    id
                    name
                  }
                  updatedAt
                  updater {
                    id
                    name
                  }
                }
              }
            }
          `,
          variables: {
            id: this.playGroupId
          }
        })
      ).data.playGroup

      if (!this._playGroup) {
        throw 'playgroup not found'
      }

      this._boards = this._playGroup.boards
    } catch (ex) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: ex,
            ex
          }
        })
      )
    } finally {
      this._showSpinner = false
    }
  }

  updated(changes) {
    if (changes.has('playGroupId')) {
      let player = this.shadowRoot.querySelector('board-player')
      player && player.stop()
      this.refresh()
    }
  }

  stateChanged(state) {
    this._baseUrl = state.app.baseUrl
  }

  get oopsNote() {
    return {
      icon: 'style',
      title: 'EMPTY PLAYGROUP',
      description: 'There are no board to be shown'
    }
  }

  render() {
    var oops = !this._showSpinner && !this._playGroup && this.oopsNote

    return oops
      ? html`
          <oops-note
            icon=${oops.icon}
            title=${oops.title}
            description=${oops.description}
            @click=${oops.click || NOOP}
          ></oops-note>
        `
      : html`
          <board-player .boards=${this._boards} .provider=${provider}></board-player>
          <oops-spinner ?show=${this._showSpinner}></oops-spinner>
        `
  }
}

customElements.define('stowd-board-player', BoardPlayer)

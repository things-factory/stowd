import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import './search/search-input'

console.log(`
 ▄▄▄ ▄▄▄▄▄           ▄▄▄▄▄
▓   ▀  ▓             ▓    ▓
▀▀▄▄   ▓  ▄▄▄  ▄ ▄ ▄ ▓    ▓
▄   ▓  ▓ ▓   ▓ ▓ ▓ ▓ ▓    ▓
 ▀▀▀   ▀  ▀▀▀   ▀ ▀  ▀▀▀▀▀
`)

export default function bootstrap() {
  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span>STowD</span>
      `,
      position: TOOL_POSITION.FRONT
    }
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <search-input> </search-input>
      `,
      position: TOOL_POSITION.FRONT
    }
  })
}

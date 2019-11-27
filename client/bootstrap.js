import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import '@material/mwc-textfield'

console.log(`
▄▄▄▄ ▄▄▄▄▄           ▄▄▄▄▄
▓      ▓             ▓    ▓
▓▓▓▓   ▓  ▄▄▄  ▄ ▄ ▄ ▓    ▓
   ▓   ▓ ▓   ▓ ▓ ▓ ▓ ▓    ▓
▀▀▀▀   ▀  ▀▀▀   ▀ ▀  ▀▀▀▀▀
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
        <mwc-textfield class="left right" ; label="My Textfield" iconTrailing="search" outlined> </mwc-textfield>
      `,
      position: TOOL_POSITION.FRONT
    }
  })
}

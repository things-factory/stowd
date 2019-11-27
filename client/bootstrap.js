import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'

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
      template: 'STowD',
      position: TOOL_POSITION.FRONT
    }
  })
}

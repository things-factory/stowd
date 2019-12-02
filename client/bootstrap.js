import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'

import search from './reducers/search'

import './search/search-input'
import './viewparts/user-circle'

console.log(`
 ▄▄▄ ▄▄▄▄▄           ▄▄▄▄▄
▓   ▀  ▓             ▓    ▓
▀▀▄▄   ▓  ▄▄▄  ▄ ▄ ▄ ▓    ▓
▄   ▓  ▓ ▓   ▓ ▓ ▓ ▓ ▓    ▓
 ▀▀▀   ▀  ▀▀▀   ▀ ▀  ▀▀▀▀▀
`)

export default function bootstrap() {
  store.addReducers({ search })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.2em;">STowD</span>
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

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.0em;">Become a partner</span>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.0em;">Saved</span>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.0em;">Help</span>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <user-circle> </user-circle>
      `,
      position: TOOL_POSITION.REAR
    }
  })
}

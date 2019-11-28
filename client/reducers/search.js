import { UPDATE_BIZPLACES } from '../actions/search.js'

const INITIAL_STATE = {
  bizplaces: []
}

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BIZPLACES:
      return {
        ...state,
        bizplaces: action.bizplaces
      }

    default:
      return state
  }
}

export default search

import { UPDATE_BIZPLACES, UPDATE_SEARCH_MAP } from '../actions/search.js'

const INITIAL_STATE = {
  bizplaces: [],
  map: null
}

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BIZPLACES:
      return {
        ...state,
        bizplaces: action.bizplaces
      }

    case UPDATE_SEARCH_MAP:
      return {
        ...state,
        map: action.map
      }

    default:
      return state
  }
}

export default search

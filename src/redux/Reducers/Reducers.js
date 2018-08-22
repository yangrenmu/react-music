import { combineReducers } from 'redux'
import { Object } from 'core-js';

const musicListIds = (state = { musicListId: '' }, action) => {
  // console.log('reducer1')
  switch (action.type) {
  case 'MUSIC_LIST_ID':
    state.musicListId = action.data
    return state
  default:
    return state
  }
}
const musicIds = (state = { musicId: '' }, action) => {
  // console.log('reducer2')
  switch (action.type) {
  case 'MUSIC_ID':
    state.musicId = action.data
    return state
  default:
    return state
  }
}
const playStates = (state = { playState: 'playing' }, action) => {
  // console.log(action)
  switch (action.type) {
  case 'PLAYSTATE':
    return Object.assign({}, { playState: action.data })
  default:
    return state
  }
}
const updateIndexs = (state = {}, action) => {
  // console.log(action.type)
  switch (action.type) {
  case 'UPDATE_INDEX':
    return Object.assign({}, { currentIndex: action.data })
  default:
    return state
  }
}
const albums = (state = { album: {} }, action) => {
  switch (action.type) {
  case 'ALBUM':
    return Object.assign({}, { album: action.data })
  default: return state
  }
}
const showPlayMusics = (state = { showPlayMusic: false }, action) => {
  switch (action.type) {
  case 'SHOWPLAYMUSIC':
    return Object.assign({}, { showPlayMusic: action.data })
  default: return state
  }
}

export default combineReducers({
  musicListIds, musicIds, playStates, updateIndexs, albums, showPlayMusics
})

import { combineReducers } from 'redux'

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
const controlPlays = (state = { playState: '' }, action) => {
  switch (action.type) {
  case 'CONTROLPLAY':
    state.playState = action.data
    return state
  default:
    return state
  }
}

export default combineReducers({ musicListIds, musicIds, controlPlays })

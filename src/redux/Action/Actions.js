const musicListIdAction = data => ({ type: 'MUSIC_LIST_ID', data })
const musicIdAction = data => ({ type: 'MUSIC_ID', data })
const playStateAction = data => ({ type: 'PLAYSTATE', data })
const currentIndexAction = data => ({ type: 'UPDATE_INDEX', data })
const albumAction = data => ({ type: 'ALBUM', data })
const showPlayMusicAction = data => ({ type: 'SHOWPLAYMUSIC', data })

export {
  musicListIdAction, musicIdAction, playStateAction, currentIndexAction, albumAction, showPlayMusicAction
}

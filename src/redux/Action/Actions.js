const musicListIdAction = (data) => {
  // console.log('action')
  return { type: 'MUSIC_LIST_ID', data}
}
const musicIdAction = (data) => {
  return {type: 'MUSIC_ID', data}
}
export {musicListIdAction, musicIdAction}
import { all } from 'redux-saga/effects'
import { songWatcherSaga } from '../features/songs/songSaga'

export default function* rootSaga() {
  yield all([songWatcherSaga()])
}

import { call, put, takeLatest } from 'redux-saga/effects'
import axios from '../../utils/axios'
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
} from './songSlice'

function* fetchSongsSaga() {
  try {
    const res = yield call(axios.get, '/songs')
    yield put(fetchSongsSuccess(res.data))
  } catch (error) {
    yield put(fetchSongsFailure(error.message))
  }
}

function* createSongSaga(action) {
  try {
    const res = yield call(() =>
      axios.post('/create-song', action.payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    )
    yield put(createSongSuccess(res.data))
  } catch (error) {
    yield put(createSongFailure(error.message))
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(() => axios.delete(`/songs/${action.payload}`))
    yield put(deleteSongSuccess(action.payload))
  } catch (error) {
    yield put(deleteSongFailure(error.message))
  }
}

function* updateSongSaga(action) {
  try {
    const { id, songData } = action.payload
    const res = yield call(() =>
      axios.put(`/songs/${id}`, songData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    )
    yield put(updateSongSuccess(res.data))
  } catch (error) {
    yield put(updateSongFailure(error.message))
  }
}

export function* songWatcherSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga)
  yield takeLatest(createSongStart.type, createSongSaga)
  yield takeLatest(deleteSongStart.type, deleteSongSaga)
  yield takeLatest(updateSongStart.type, updateSongSaga)
}

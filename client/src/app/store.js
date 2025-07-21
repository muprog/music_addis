import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import songReducer from '../features/songs/songSlice'
import rootSaga from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

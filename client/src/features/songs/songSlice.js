import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  songs: [],
  loading: false,
  error: null,
  songCreated: false,
}

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true
    },
    fetchSongsSuccess: (state, action) => {
      state.songs = action.payload
      state.loading = false
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    createSongStart: (state) => {
      state.loading = true
      state.songCreated = false
    },
    createSongSuccess: (state, action) => {
      state.songs.push(action.payload)
      state.loading = false
      state.songCreated = true
    },
    createSongFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.songCreated = false
    },
    resetSongCreated: (state) => {
      state.songCreated = false
    },

    deleteSongStart: (state) => {
      state.loading = true
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload)
      state.loading = false
    },
    deleteSongFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateSongStart: (state) => {
      state.loading = true
    },
    updateSongSuccess: (state, action) => {
      const updatedSong = action.payload
      state.songs = state.songs.map((song) =>
        song._id === updatedSong._id ? updatedSong : song
      )
      state.loading = false
    },
    updateSongFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  resetSongCreated,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
} = songSlice.actions

export default songSlice.reducer

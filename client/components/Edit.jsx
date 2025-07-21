import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import {
  fetchSongsStart,
  deleteSongStart,
} from '../src/features/songs/songSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled('div')((props) => ({
  padding: '2rem',
  background: props.theme.colors.surface,
  color: 'white',
}))

const SongCard = styled('div')((props) => ({
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '1rem',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'black',
  color: 'white',
}))

const SongDetails = styled.div`
  flex: 1;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  ${(props) =>
    props.variant === 'delete'
      ? `
    background-color: #ff4d4f;
    color: white;
  `
      : `
    background-color: #1890ff;
    color: white;
  `}
`

const EditPage = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { songs, loading, error } = useSelector((state) => state.songs)

  useEffect(() => {
    dispatch(fetchSongsStart())
  }, [dispatch])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongStart(id))
    }
  }

  const handleUpdate = (id) => {
    navigate(`/update-song/${id}`)
  }

  return (
    <Container>
      <h2>Edit Songs</h2>
      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {songs.length === 0 && !loading && <p>No songs found.</p>}
      {songs.map((song) => (
        <SongCard key={song._id}>
          <SongDetails>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <p>Genre: {song.genre}</p>
            <p>Album: {song.album}</p>
            <p>Year: {new Date(song.year).getFullYear()}</p>
          </SongDetails>
          <ButtonGroup>
            <Button onClick={() => handleUpdate(song._id)}>Update</Button>
            <Button variant='delete' onClick={() => handleDelete(song._id)}>
              Delete
            </Button>
          </ButtonGroup>
        </SongCard>
      ))}
    </Container>
  )
}

export default EditPage

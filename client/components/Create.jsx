import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import {
  createSongStart,
  resetSongCreated,
} from '../src/features/songs/songSlice'

const OuterBox = styled('div')((props) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.theme.colors.surface,
}))

const InnerBox = styled('div')({
  border: '1px solid gray',
  backgroundColor: 'black',
  width: '320px',
  padding: '30px 35px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
})

const Title = styled('div')({
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#333',
})

const InputGroup = styled('div')({
  marginBottom: '15px',
  color: 'white',
})

const StyledInput = styled('input')({
  color: 'white',
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'border-color 0.3s ease',
  background: 'black',
  '&:focus': {
    borderColor: '#007bff',
    outline: 'none',
  },
  '::-webkit-calendar-picker-indicator': {
    filter: 'invert(1)',
    cursor: 'pointer',
  },
})

const StyledButton = styled('button')((props) => ({
  width: '100%',
  padding: '10px',
  backgroundColor: props.theme.colors?.surface || '#007bff',
  color: 'white',
  fontSize: '15px',
  fontWeight: '600',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  opacity: props.disabled ? 0.6 : 1,
  pointerEvents: props.disabled ? 'none' : 'auto',
}))

const FileLabel = styled('label')({
  display: 'block',
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '14px',
  color: '#6c757d',
  cursor: 'pointer',
  backgroundColor: 'transparent',
})

export default function Create() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { loading, error, songCreated } = useSelector((state) => state.songs)

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    album: '',
    year: '',
    coverImage: '',
    audio: '',
  })

  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (songCreated) {
      setSuccessMessage('Song submitted successfully!')
      dispatch(resetSongCreated())

      setFormData({
        title: '',
        artist: '',
        genre: '',
        album: '',
        year: '',
        coverImage: '',
        audio: '',
      })
    }
  }, [songCreated, dispatch])

  const handleChange = (e) => {
    const { name, value, files, type } = e.target
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccessMessage('')

    if (
      !formData.title ||
      !formData.artist ||
      !formData.coverImage ||
      !formData.audio
    ) {
      alert('Please fill all required fields and upload files.')
      return
    }

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })

    dispatch(createSongStart(data))
  }

  return (
    <OuterBox>
      <InnerBox>
        <Title>Create Song</Title>
        {successMessage && (
          <div
            style={{
              color: 'green',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <StyledInput
              type='text'
              placeholder='title'
              name='title'
              onChange={handleChange}
              value={formData.title}
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <StyledInput
              type='text'
              placeholder='artist'
              name='artist'
              onChange={handleChange}
              value={formData.artist}
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <StyledInput
              type='text'
              placeholder='genre'
              name='genre'
              onChange={handleChange}
              value={formData.genre}
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <StyledInput
              type='text'
              placeholder='album'
              name='album'
              onChange={handleChange}
              value={formData.album}
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <StyledInput
              type='date'
              placeholder='year'
              name='year'
              onChange={handleChange}
              value={formData.year}
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <FileLabel htmlFor='coverImage'>Cover Image</FileLabel>
            <StyledInput
              id='coverImage'
              type='file'
              name='coverImage'
              onChange={handleChange}
              accept='image/*'
              disabled={loading}
            />
          </InputGroup>
          <InputGroup>
            <FileLabel htmlFor='audio'>Audio</FileLabel>
            <StyledInput
              id='audio'
              type='file'
              name='audio'
              onChange={handleChange}
              accept='audio/*'
              disabled={loading}
            />
          </InputGroup>
          <StyledButton type='submit' disabled={loading} theme={theme}>
            {loading ? 'Submitting...' : 'Create'}
          </StyledButton>
        </form>
      </InnerBox>
    </OuterBox>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams, useNavigate } from 'react-router-dom'
// import {
//   updateSongStart,
//   fetchSongsStart,
// } from '../src/features/songs/songSlice'
// import styled from '@emotion/styled'

// const Container = styled.div`
//   padding: 2rem;
//   max-width: 600px;
//   margin: auto;
// `

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `

// const Input = styled.input`
//   padding: 0.75rem;
//   border-radius: 6px;
//   border: 1px solid #ccc;
// `

// const Button = styled.button`
//   background-color: #1890ff;
//   color: white;
//   padding: 0.75rem;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   font-weight: bold;
//   margin-top: 1rem;
// `

// const Update = () => {
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const { songs } = useSelector((state) => state.songs)

//   const [formData, setFormData] = useState({
//     title: '',
//     artist: '',
//     genre: '',
//     album: '',
//     year: '',
//     coverImage: '',
//     audio: '',
//   })

//   useEffect(() => {
//     if (songs.length === 0) {
//       dispatch(fetchSongsStart())
//     } else {
//       const songToEdit = songs.find((song) => song._id === id)
//       if (songToEdit) {
//         setFormData({
//           title: songToEdit.title || '',
//           artist: songToEdit.artist || '',
//           genre: songToEdit.genre || '',
//           album: songToEdit.album || '',
//           year: new Date(songToEdit.year).toISOString().split('T')[0],
//           coverImage: songToEdit.coverImage || '',
//           audio: songToEdit.audio || '',
//         })
//       }
//     }
//   }, [id, songs, dispatch])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     dispatch(updateSongStart({ id, songData: formData }))
//     navigate('/edit') // Go back to edit page
//   }

//   return (
//     <Container>
//       <h2>Update Song</h2>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           name='title'
//           value={formData.title}
//           onChange={handleChange}
//           placeholder='Title'
//           required
//         />
//         <Input
//           name='artist'
//           value={formData.artist}
//           onChange={handleChange}
//           placeholder='Artist'
//           required
//         />
//         <Input
//           name='genre'
//           value={formData.genre}
//           onChange={handleChange}
//           placeholder='Genre'
//         />
//         <Input
//           name='album'
//           value={formData.album}
//           onChange={handleChange}
//           placeholder='Album'
//         />
//         <Input
//           name='year'
//           type='date'
//           value={formData.year}
//           onChange={handleChange}
//           placeholder='Year'
//         />
//         <Input
//           name='coverImage'
//           value={formData.coverImage}
//           onChange={handleChange}
//           placeholder='Cover Image URL'
//         />
//         <Input
//           name='audio'
//           value={formData.audio}
//           onChange={handleChange}
//           placeholder='Audio URL'
//         />
//         <Button type='submit'>Update Song</Button>
//       </Form>
//     </Container>
//   )
// }

// export default Update

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  updateSongStart,
  fetchSongsStart,
} from '../src/features/songs/songSlice'
import styled from '@emotion/styled'

const CancelButton = styled.button`
  background-color: #aaa;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  &:hover {
    background-color: #888;
  }
`
const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`

const ReadOnlyInput = styled(Input)`
  background-color: #f5f5f5;
  color: #555;
`

const Label = styled.label`
  font-weight: 600;
  margin-top: 1rem;
`

const PreviewImage = styled.img`
  width: 150px;
  margin-top: 8px;
  border-radius: 8px;
`

const AudioPreview = styled.audio`
  margin-top: 8px;
  width: 100%;
`

const Button = styled.button`
  background-color: #1890ff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
`

const Update = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { songs } = useSelector((state) => state.songs)

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    album: '',
    year: '',
    coverImage: '',
    audio: '',
    coverImageFile: null,
    audioFile: null,
  })

  useEffect(() => {
    if (songs.length === 0) {
      dispatch(fetchSongsStart())
    } else {
      const songToEdit = songs.find((song) => song._id === id)
      if (songToEdit) {
        setFormData({
          title: songToEdit.title || '',
          artist: songToEdit.artist || '',
          genre: songToEdit.genre || '',
          album: songToEdit.album || '',
          year: songToEdit.year
            ? new Date(songToEdit.year).toISOString().split('T')[0]
            : '',
          coverImage: songToEdit.coverImage || '',
          audio: songToEdit.audio || '',
          coverImageFile: null,
          audioFile: null,
        })
      }
    }
  }, [id, songs, dispatch])

  const handleChange = (e) => {
    const { name, value, files, type } = e.target

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name + 'File']: files[0] || null, // coverImageFile or audioFile
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const data = new FormData()

  //   data.append('title', formData.title)
  //   data.append('artist', formData.artist)
  //   data.append('genre', formData.genre)
  //   data.append('album', formData.album)
  //   data.append('year', formData.year)

  //   if (formData.coverImageFile) {
  //     data.append('coverImage', formData.coverImageFile)
  //   } else {
  //     data.append('coverImage', formData.coverImage)
  //   }

  //   if (formData.audioFile) {
  //     data.append('audio', formData.audioFile)
  //   } else {
  //     data.append('audio', formData.audio)
  //   }

  //   dispatch(updateSongStart({ id, songData: data }))
  //   navigate('/edit')
  // }
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append('title', formData.title)
    data.append('artist', formData.artist)
    data.append('genre', formData.genre)
    data.append('album', formData.album)
    data.append('year', formData.year)

    if (formData.coverImageFile) {
      data.append('coverImage', formData.coverImageFile)
    } else if (formData.coverImage) {
      data.append('existingCoverImage', formData.coverImage)
    }

    if (formData.audioFile) {
      data.append('audio', formData.audioFile)
    } else if (formData.audio) {
      data.append('existingAudio', formData.audio)
    }

    dispatch(updateSongStart({ id, songData: data }))
    navigate('/edit')
  }
  return (
    <Container>
      <h2>Update Song</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          required
        />
        <Input
          name='artist'
          value={formData.artist}
          onChange={handleChange}
          placeholder='Artist'
          required
        />
        <Input
          name='genre'
          value={formData.genre}
          onChange={handleChange}
          placeholder='Genre'
        />
        <Input
          name='album'
          value={formData.album}
          onChange={handleChange}
          placeholder='Album'
        />
        <Input
          name='year'
          type='date'
          value={formData.year}
          onChange={handleChange}
          placeholder='Year'
        />

        {/* Cover Image Preview and Upload */}
        <Label>Current Cover Image</Label>
        {formData.coverImage && (
          <PreviewImage
            src={`http://localhost:5000/uploads/coverImages/${formData.coverImage}`}
            alt='cover'
          />
        )}
        <Label>Change Cover Image (optional)</Label>
        <Input
          name='coverImage'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />

        {/* Audio Preview and Upload */}
        <Label>Current Audio</Label>
        {formData.audio && (
          <AudioPreview controls>
            <source
              src={`http://localhost:5000/uploads/audios/${formData.audio}`}
              type='audio/mpeg'
            />
            Your browser does not support the audio element.
          </AudioPreview>
        )}
        <Label>Change Audio (optional)</Label>
        <Input
          name='audio'
          type='file'
          accept='audio/*'
          onChange={handleChange}
        />

        <Button type='submit'>Update Song</Button>
        <CancelButton type='button' onClick={() => navigate('/edit')}>
          Cancel
        </CancelButton>
      </Form>
    </Container>
  )
}

export default Update

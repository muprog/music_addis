// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   fetchSongsStart,
//   deleteSongStart,
// } from '../src/features/songs/songSlice'
// import { Link } from 'react-router-dom'

// const Edit = () => {
//   const dispatch = useDispatch()
//   const { songs, loading, error } = useSelector((state) => state.songs)

//   useEffect(() => {
//     dispatch(fetchSongsStart())
//   }, [dispatch])

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this song?')) {
//       dispatch(deleteSongStart(id))
//     }
//   }

//   return (
//     <div className='p-6 max-w-4xl mx-auto'>
//       <h1 className='text-2xl font-bold mb-6 text-center'>Manage Songs</h1>

//       {loading && <p className='text-blue-600'>Loading...</p>}
//       {error && <p className='text-red-500'>{error}</p>}

//       <table className='w-full border'>
//         <thead>
//           <tr className='bg-gray-100'>
//             <th className='p-2 border'>Cover</th>
//             <th className='p-2 border'>Title</th>
//             <th className='p-2 border'>Artist</th>
//             <th className='p-2 border'>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {songs.map((song) => (
//             <tr key={song._id} className='text-center border-t'>
//               <td className='p-2 border'>
//                 <img
//                   src={`http://localhost:5000/uploads/coverImages/${song.coverImage}`}
//                   alt={song.title}
//                   className='w-16 h-16 object-cover mx-auto'
//                 />
//               </td>
//               <td className='p-2 border'>{song.title}</td>
//               <td className='p-2 border'>{song.artist}</td>
//               <td className='p-2 border'>
//                 <Link
//                   to={`/update-song/${song._id}`}
//                   className='bg-yellow-400 px-3 py-1 rounded mr-2'
//                 >
//                   Update
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(song._id)}
//                   className='bg-red-500 text-white px-3 py-1 rounded'
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Edit

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSongsStart,
  deleteSongStart,
} from '../src/features/songs/songSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled.div`
  padding: 2rem;
`

const SongCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
`

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

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongsStart } from '../src/features/songs/songSlice'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const Container = styled('div')((props) => ({
  padding: '2rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
  background: props.theme.colors.surface,
}))

const Card = styled.div`
  background: black;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`

const Audio = styled.audio`
  width: 100%;
  margin-top: 1rem;
`

const FullScreen = styled.div`
  position: fixed;
  inset: 0;
  background: #000000f2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  flex-direction: column;
  color: white;
`
const LoadingDiv = styled('div')((props) => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: props.theme.colors.background,
  color: 'white',
}))

export default function HomePage() {
  const them = useTheme()
  const dispatch = useDispatch()
  const { songs, loading } = useSelector((state) => state.songs)
  const audioRefs = useRef({})
  const [fullScreenSong, setFullScreenSong] = useState(null)

  useEffect(() => {
    dispatch(fetchSongsStart())
  }, [dispatch])

  const handlePlay = (id) => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (key !== id && audio) {
        audio.pause()
        audio.currentTime = 0
      }
    })
    audioRefs.current[id]?.play()
  }

  const handlePause = (id) => {
    audioRefs.current[id]?.pause()
  }
  if (songs.length > 0) console.log(songs)
  if (loading)
    return (
      <LoadingDiv>
        <p>Loading songs...</p>
      </LoadingDiv>
    )

  return (
    <>
      <Container>
        {songs.map((song) => (
          <Card key={song._id}>
            <CoverImage
              src={
                song.coverImage
                  ? `http://localhost:5000/uploads/coverImages/${song.coverImage.replace(
                      /\\/g,
                      '/'
                    )}`
                  : 'https://via.placeholder.com/300x200?text=No+Image'
              }
              alt={song.title}
            />
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <Audio
              controls
              ref={(el) => (audioRefs.current[song._id] = el)}
              onPlay={() => handlePlay(song._id)}
              onPause={() => handlePause(song._id)}
            >
              <source
                src={
                  song.audio
                    ? `http://localhost:5000/uploads/audios/${song.audio.replace(
                        /\\/g,
                        '/'
                      )}`
                    : ''
                }
                type='audio/mpeg'
              />
              Your browser does not support the audio element.
            </Audio>
            <button onClick={() => setFullScreenSong(song)}>All</button>
          </Card>
        ))}
      </Container>

      {fullScreenSong && (
        <FullScreen onClick={() => setFullScreenSong(null)}>
          <h1>{fullScreenSong.title}</h1>
          <p>{fullScreenSong.artist}</p>
          <img
            src={
              fullScreenSong.coverImage
                ? `http://localhost:5000/uploads/coverImages/${fullScreenSong.coverImage.replace(
                    /\\/g,
                    '/'
                  )}`
                : 'https://via.placeholder.com/300x200?text=No+Image'
            }
            alt='cover'
            style={{ width: '300px', borderRadius: '12px' }}
          />
          <audio
            controls
            autoPlay
            style={{ marginTop: '1rem' }}
            src={
              fullScreenSong.audio
                ? `http://localhost:5000/uploads/audios/${fullScreenSong.audio.replace(
                    /\\/g,
                    '/'
                  )}`
                : ''
            }
          />
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Click anywhere to close
          </p>
        </FullScreen>
      )}
    </>
  )
}

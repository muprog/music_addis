import musicIcon from '../public/images/music.png'
import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import '../public/styles/styling.css'
import { Link } from 'react-router-dom'
const HeaderWrapper = styled('div')((props) => ({
  padding: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'flex',
  color: 'white',
  justifyContent: 'space-between',
  background: props.theme.colors.background,
}))

const HeaderOuterDive = styled('div')((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '130px',
  flexShrink: '0',
  alignItems: 'center',
}))
const HeaderImage = styled('img')((props) => ({
  objectFit: 'contain',
  width: '30px',
  height: '30px',
}))
const HeaderLink = styled(Link)((props) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'white',
}))

export default function Header() {
  const theme = useTheme()

  return (
    <HeaderWrapper>
      <HeaderOuterDive>
        <div style={{}}>
          <HeaderImage src={musicIcon} alt='Music Addis' />
        </div>
        <div>Music Addis</div>
      </HeaderOuterDive>
      <div>
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '5px',
            listStyle: 'none',
          }}
        >
          <li>
            <HeaderLink to='/' class='header-link'>
              Home
            </HeaderLink>
          </li>
          <li>
            <HeaderLink to='/create' class='header-link'>
              Create
            </HeaderLink>
          </li>
          <li>
            <HeaderLink to='/edit' class='header-link'>
              Edit
            </HeaderLink>
          </li>
        </ul>
      </div>
    </HeaderWrapper>
  )
}

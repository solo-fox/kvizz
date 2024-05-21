'use client'
import styled from "styled-components"; import ColorizeIcon from '@mui/icons-material/Colorize';

export default function WordComponent({ display }) {
  return(
    <Word style={{display: display ? "block" : "none"}}>
      <p> Dog </p>
    </Word>
  )
}

const Word = styled.div`
position:absolute;
background:#E5FFDE;
padding:0.5rem 2rem;
border-radius:5px;
left:2rem;
bottom:1rem;
color:black;
font-weight:800;
border:2px #581908 solid;
`
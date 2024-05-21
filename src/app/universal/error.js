'use client' 
import styled from 'styled-components'

export default function Err({ msg }) {
  return (
    <ErrorMessage>
      <p>
       { msg }
      </p>
    </ErrorMessage>
  )
}

const ErrorMessage = styled.div`
color: white;
background: #B20D30;
padding:0.5rem 1rem;
border-radius: 5px;
border:2px solid black
font-weight:800;
font-size: 130%;
`
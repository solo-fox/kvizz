'use client'

import styled from 'styled-components'
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading({ state }) {
  return(
    <Loader style={ { display: state ? "flex": "none" }}>
      <PacmanLoader
      color={"#ea638c"}
      loading={true}
      size={50}
      />
    </Loader>
  )
}

const Loader = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  top:0px;
  right:0px;
  z-index:100;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  overflow:hidden;
`

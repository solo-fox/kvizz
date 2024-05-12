'use client'

import {useState} from "react"
import styled from "styled-components";
import Tools from "./components/Tools"
import CanvasComponent from "./components/Canvas"

export default function PlayPage() {
    const [color, setColor] = useState("#000000");
    const [fillColor, setFillColor] = useState("none");
    return (
    <Main>
      <Tools color={color} setColor={setColor} setFillColor={setFillColor} fillColor={fillColor}/>
      <CanvasComponent color={color} fillColor={fillColor} />
    </Main>
  )
}

  const Main = styled.div`
  position:relative;
  background-color: #002A22;
  background-image: linear-gradient(135deg, #002A22 25%, transparent 25%),
  linear-gradient(225deg, #002A22 25%, transparent 25%),
  linear-gradient(45deg, #002A22 25%, transparent 25%),
  linear-gradient(315deg, #002A22 25%, #fefefe 25%);
  background-position:
  24px 0,
  24px 0,
  0 0,
  0 0;
  background-size: 48px 48px;
  background-repeat: repeat;
  height: 89vh;
  width:100vw;
  `
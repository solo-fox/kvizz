'use client'

import styled from "styled-components";
import AddBoxIcon from '@mui/icons-material/AddBox';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Button3D from "../universal/Button"
import Link from "next/link"

export default function HeaderComponent(){
  return(
    <Header>
      <Logo>
        <p>Kvizz</p>
      </Logo>
      <ButtonGroup>
        <button className="pushable play">
          <span className="front playf">
            <Link href="/create">
              <AddBoxIcon />
            </Link>
          </span>
        </button>
        <button className="pushable join">
          <span className="front joinf">
            <Link href="/join">
              <SportsEsportsIcon /> Join
            </Link>
          </span>
        </button>
      </ButtonGroup>
      </Header>
  )
}

const Header = styled.div`
display:flex;
align-items:center;
flex-direction: column;
gap:4rem;
padding: 1rem 2rem;
width:100vw;
`

const Logo = styled.div`
font-family: "Pixelify Sans";
font-optical-sizing: auto;
font-weight: 400;
font-style: normal;
font-size: 202px;
line-height:1em;
color: #ea638c;
text-shadow: 0px 0px 0 rgb(229,94,135),
                 -1px 1px 0 rgb(223,88,129),
                 -2px 2px 0 rgb(218,83,124),
                 -3px 3px 0 rgb(212,77,118),
                 -4px 4px 0 rgb(207,72,113),
                 -5px 5px 0 rgb(201,66,107),
                 -6px 6px 0 rgb(196,61,102),
                 -7px 7px 0 rgb(190,55,96),
                 -8px 8px 0 rgb(185,50,91),
                 -9px 9px 0 rgb(179,44,85),
                 -10px 10px 0 rgb(174,38,80),
                 -11px 11px 0 rgb(168,33,74),
                 -12px 12px  0 rgb(163,28,69),
                 -13px 13px 12px rgba(0,0,0,0.98),
                 -13px 13px 1px rgba(0,0,0,0.5),
                 0px 0px 12px rgba(0,0,0,.2);
@media only screen and (max-width: 768px) {
  font-size:100px;
}
`
 

const ButtonGroup = styled.div`
display:flex;
align-items:center;
gap:2rem;
.pushable {
border-radius: 12px;
border: none;
padding: 0;
cursor: pointer;
outline-offset: 4px;
background: hsl(345deg 100% 47%);
}
.pushable:focus:not(:focus-visible) {
outline: none;
}
.front {
padding: 12px 42px;
border-radius: 12px;
font-size: 1.25rem;
color: white;
font-weight:bold;
transform: translateY(-6px);
display:flex;
align-items:center;
gap:15px;
}

.pushable:active .front {
transform: translateY(-2px);
}
.join{
background: hsl(340deg 100% 32%);
}
.joinf{
background: hsl(342deg 100% 47%);
}
.playf{
background: hsl(169deg 100% 47%);
}
.play{
background: hsl(170deg 100% 32%);
}  
@media only screen and (max-width: 768px) {
  padding:6px 21px;
}
`
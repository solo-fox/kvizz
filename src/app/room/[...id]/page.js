'use client'

import {
  useParams
} from 'next/navigation'
import styled from 'styled-components'
import List from './components/List'

export default function Join() {
  
  const {id} = useParams();
  let room_id = id[0]
  
  return (
    <Main>
      <List room_id={room_id} />
    </Main>
  );
}

const Main = styled.div`
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
overflow-y:hidden;
display:flex;
align-items:center;
justify-content:center;
`
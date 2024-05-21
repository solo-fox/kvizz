'use client'

import styled from 'styled-components'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DeleteIcon from '@mui/icons-material/Delete';
import GiteIcon from '@mui/icons-material/Gite';
import  { get_users } from "../../../db/user"
import  { beginn_cycle } from "../../../db/room"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button3D from "../../../universal/Button"
import {db_store} from '../../../firebase';
import {doc,onSnapshot} from "firebase/firestore";
import Link from "next/link"

export default function Users({ room_id, user_id }) {
  const [usersList, SetUsersList] = useState([])
  const [onTurnId, setUserOnTurnId] = useState("")
  const [copied, setCopied] = useState(false)
  const [host, setIsHost] = useState(false)
  const router = useRouter();
  let unsubscribe;
  
  useEffect(() => {
    const roomRef = doc(db_store, "rooms", room_id);
    
    unsubscribe = onSnapshot(roomRef, (roomSnap) => {
      const currentData = roomSnap.data().users || [];
      const usersListArray = Object.entries(currentData).map(([key, value]) => ({
        ...value,
        id: key
      }));
      SetUsersList(usersListArray); // Update state with new data
      usersListArray.forEach((user) => {
        if (localStorage.getItem("user_id") === user.id && user.host === true) {
          setIsHost(true);
        }
      });
    });
    
    return () => unsubscribe && unsubscribe(); // Cleanup function
  },[room_id]); // Dependency array to re-fetch users when roomId changes
  
  const redirect = () => {
    console.log(user_id)
    console.log(room_id)
  }
  
  return(
    <Container>
      <Copy>
        <div className="overflow-scroll">
          <span className="text-nowrap"> {`https://kvizz.vercel.app/cuser/${room_id}`} </span>
        </div>
        <ButtonCon>
          <CopyLink text={`https://kvizz.vercel.app/cuser/${room_id}`} onCopy={() => setCopied(true)}>
            <Button3D b1={"hsl(345deg 100% 47%)" } b2={"hsl(342deg 76% 65%)"}>
              <p>{copied ? "copied" : "Copy" }</p>
            </Button3D>
          </CopyLink>
        </ButtonCon>
      </Copy>
      {usersList.map((user) => (
        <User key={user.id} turn={user.onTurn.toString()}>
          <p className="text-nowrap overflow-scroll">{user.name}</p>
          <Type>
            {user.host ? <GiteIcon /> : <ChildCareIcon />}
            <Score>
              {user.score}
            </Score>
          </Type>
        </User>
      ))}
      { host ? (
      <button className="play" b1={"hsl(145deg 100% 47%)" } b2={"hsl(140deg 76% 65%)"} onClick={redirect}>
        Gooo
      </button>
      ) : ""}
    </Container>
  )
}

const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction: column;
justify-content:space-evenly;
align-items:center;
`

const User = styled.div`
display: flex;
width:80%;
align-items: center;
gap: 1rem;
padding:0.5rem;
border-radius:5px;
font-weight:${props => props.turn == "true" ? '800' : '400'};
border: 1px ${props => props.turn == "true" ? 'white' : '#EA638C'} solid;
background: ${props => props.turn == "true" ? '#EA638C' : 'white'};
transform: ${props => props.turn == "true" ? 'scale(1.2)' : 'scale(1)'};
${props => props.turn == "true" ? 'background-image: linear-gradient(135deg, #EA638C 25%, transparent 25%),linear-gradient(225deg, #EA638C 25%, transparent 25%),linear-gradient(45deg, #EA638C 25%, transparent 25%),linear-gradient(315deg, #EA638C 25%, #fefefe 25%);background-position:24px 0,24px 0,0 0,0 0;background-size: 48px 48px;background-repeat: repeat;' : '' }
`

const Type = styled.div`
margin-left:auto;
display:flex;
align-items:center;
gap:1rem;
`

const Score = styled.div`
  background:#002A22;
  padding:0.5rem 1rem;
  border-radius:25px;
  color: white;
`

const Copy = styled.div`
width: 100%;
border: 1px solid #002A22;
border-radius: 5px;
padding:1rem;
position:relative;
overflow: hidden;
`

const CopyLink = styled(CopyToClipboard)`
`

const ButtonCon = styled.div`
position:absolute;
right:0px;
top:50%;
transform: translate(0%,-50%);
background:linear-gradient(to left, hsl(345deg,100%,47%,0.5), rgba(255,255,255,0));
height:100%;
width:40%;
display:flex;
align-items:center;
justify-content: center;
`
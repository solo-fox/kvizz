'use client';

import styled from 'styled-components';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DeleteIcon from '@mui/icons-material/Delete';
import GiteIcon from '@mui/icons-material/Gite';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CopySection from "./Copy";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { dbStore } from '../../../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Users( {
  room_id
}) {
  const [usersList,
    setUsersList] = useState([]);
  const [copied,
    setCopied] = useState(false);
  const [host,
    setIsHost] = useState(false);
  const [onTurnUserId,
    setOnTurnUserId] = useState("");
  const [playRunning,
    setPlayRunning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const roomRef = doc(dbStore, "rooms", room_id);

    const unsubscribe = onSnapshot(roomRef, (roomSnap) => {
      const users = roomSnap?.data()?.users || [];
      const roomData = roomSnap?.data()?.room || {};
      setPlayRunning(roomData.playIsOn)
      if (roomData.redirect == true) {
        handleRedirect();
      }
      if(roomData.rounds == 0){
        router.push(`/eval/${room_id}`)
      }
      setUsersList(users);
      users.forEach(handleUser);
    });

    return () => unsubscribe && unsubscribe();
  }, [room_id, onTurnUserId]);

  const handleUser = (user) => {
    const user_id_local = reactLocalStorage.get("KVIZZ:USER_ID");

    if (user_id_local == null) {
      toast.error("User Id is invalid!");
      return;
    }

    if (user_id_local === user.id && user.host) {
      setIsHost(true);
    }

    if (user.onTurn) {
      setOnTurnUserId(user.id);
      console.log(onTurnUserId)
    }
  };

  const handleRedirect = () => {
    console.log("Redirect")
    router.push(`/play/${room_id}/${onTurnUserId}`);
  };

  const startGame = async () => {
    if(onTurnUserId !== ""){
      try {
        const response = await fetch("/api/start", {
          method: "POST",
          body: JSON.stringify({
            roomId: room_id,
            onTurnUserId
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });
    
        if (response.ok) {
          if (playRunning) {
            let waiting = false;
            usersList.forEach(user => {
              if (user.typing) {
                toast(`Waiting for ${user.name}`);
                waiting = true;
              }
            });
            if (!waiting) {
              toast("Starting game!", { type: "success" });
            }
          } else {
            toast("Starting game!", { type: "success" });
          }
        } else {
          console.log(response);
          toast("Cannot start game!", { type: "error" });
        }
      } catch (error) {
        console.log(error);
        toast("Cannot start game!", { type: "error" });
      }
    } else {
      toast("Cannot start game! No OnTurn", { type: "error" });
    }
  };

  
  return (
    <>
    <ToastContainer />
    <Container>
      <CopySection roomId={room_id} copied={copied} setCopied={setCopied} />
      {usersList.map(user => (
      <User key={user.id} className={`${user.onTurn ? "turn" : ""}`}>
          <p className="text-nowrap overflow-scroll">
        {user.name}
      </p>
          <Type>
            {user.typing ? <HourglassBottomIcon /> : <AlarmOnIcon /> }
            {user.host ? <GiteIcon />: <ChildCareIcon />}
            <Score>{user.score}</Score>
          </Type>
        </User>
    ))}
      { host == true ? (
        <button className="play" onClick={startGame}>
            Gooo
        </button>
      ):(
        "Game will start when Host wants!"
      )
      }
    </Container> < />
  );
}

  const Container = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content:space-evenly;
  align-items:center;
  .turn{
    font-weight:800;
    border: 1px #EA638C solid;
    background: #EA638C;
    transform: scale(1.2);
    background-image: linear-gradient(135deg, #EA638C 25%, transparent 25%),linear-gradient(225deg, #EA638C 25%, transparent 25%),linear-gradient(45deg, #EA638C 25%, transparent 25%),linear-gradient(315deg, #EA638C 25%, #fefefe 25%);
    background-position:24px 0,24px 0,0 0,0 0;
    background-size: 48px 48px;
    background-repeat: repeat;
  }
  `

  const User = styled.div`
  display: flex;
  width:80%;
  align-items: center;
  gap: 1rem;
  padding:0.5rem;
  border-radius:5px;
  border: solid 1px #EA638C;
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
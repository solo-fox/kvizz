'use client'

import styled from 'styled-components'
import Err from "../../../universal/error";
import Loading from "../../../universal/Loading";
import Button3D from "../../../universal/Button";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function CUserForm({room_id}) {
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  
  const handleSubmit = async () => {
    if(nickname == ""){
      toast("Nickname cannot be empty", { type: "error" })
      return;
    }
    toast("Creating User...", { type:"pending" })
    try {
        const response = await fetch("/api/cuser", {
          method: "POST",
          body: JSON.stringify({
            roomId: room_id,
            nickname: nickname
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        if(response.ok) {
          const data = await response.json();
          reactLocalStorage.set("KVIZZ:USER_ID", data.payload.user_id)
          router.push(`/room/${room_id}`)
          toast("Let's Gooooo...", { type: "success" })
        } else {
          const data = await response.json();
          if(data.payload.error.reason == "full"){
            toast("Room is full...", { type: "warning" })
            return;
          }
          toast("Cannot create User...", { type: "error" })
        }
      } catch(error) {
        console.log(error)
        toast("Cannot create User...", { type: "error" })
      }
  }
  return(
    <Form>
      <ToastContainer />
      <input 
        type="text" 
        placeholder="Nickname" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
      />
      <Button3D 
        b1={"hsl(145deg 100% 47%)" } 
        b2={"hsl(140deg 100% 32%)"} 
        onClick={handleSubmit}
      >
        Join
      </Button3D>
    </Form>
  );
}

const Form = styled.div`
  position:relative;
  background: white;
  width:40vw;
  border-radius:5px;
  padding:1rem 1.5rem;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:1rem;
  overflow:hidden;
  -webkit-box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73); 
  box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73);
  
  input{
    border:2px solid black;
    border-radius:5px;
    padding:0.2rem 0.5rem;
    outline:none;
  }
  
  
  @media only screen and (max-width: 768px) {
    width:80vw;
  }
`;
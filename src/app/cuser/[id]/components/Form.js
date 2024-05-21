'use client'

import styled from 'styled-components'
import Err from "../../../universal/error";
import Loading from "../../../universal/Loading";
import Button3D from "../../../universal/Button";
import {create_user} from "../../../db/user";
import {room_exists} from "../../../db/room";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function CUserForm({id}) {
  const [valid, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  
  const handleSubmit = () => {
    if(nickname == ""){
      toast("Nickname cannot be empty", { type: "error" })
      return;
    }
    create_user(id, nickname)
    .then((user_id)=>{
      localStorage.setItem("user_id", user_id)
      toast("Let's Gooooo....", {type: "success"})
      router.push(`/room/${id}/${user_id}`)
      console.log(user_id)
    })
    .catch((error)=>{
      if(error == "full") {
        toast("The room is full!!!", { type: "error" })
      } else {
        toast("You arenot a Human", { type: "error" })
        console.log(error)
      }
    })
  }
  
  useEffect(() => {
    room_exists(id) 
    .then(() => {
      setState(true)
      setLoading(false)
    }).catch((error) => {
      setState(false)
      setLoading(false)
    });
  })
  
  return(
    <Form>
      {
        valid === false
        ? <Err msg="Room ID is Invalid" />
        : valid === true
        ? (
        <>
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
        </>
        )
        : <Loading state={loading}/>
      }
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
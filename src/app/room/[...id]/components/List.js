'use client'

import { useState, useEffect } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import styled from 'styled-components'
import Err from "../../../universal/error";
import Loading from "../../../universal/Loading";
import Users from "./Users";


export default function List({ room_id }) {
  const [isValid, setValidState] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    const user_id_local = reactLocalStorage.get('KVIZZ:USER_ID');
    if( user_id_local == null ){
      setLoading(false)
      setValidState(false)
    }
    const validate_backend = async () => {
      try {
        const response = await fetch("/api/valid", {
          method: "POST",
          body: JSON.stringify({
            roomId: room_id,
            userId: user_id_local
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        if(response.ok) {
          setLoading(false)
          setValidState(true)
        } else {
          response.json()
          .then((data)=>{
            console.log(data)
          })
          setLoading(false)
          setValidState(false)
        }
      } catch(error) {
        console.log(error)
        setLoading(false)
        setValidState(false)
      }
    }
    validate_backend()
  }, [room_id])
  
  return(
    <UList>
    {isValid == true ? (
      <Users room_id={room_id} />
    ) : (
    <>
    {
      isValid == null ? (
        <Loading state={loading} />
      ) : (
       <Err msg="Invalid ID" />
      )
    }
    </>
    )}
    </UList>
  );
}

const UList = styled.div`
  position:relative;
  background: white;
  width:40vw;
  height:60vh;
  border-radius:5px;
  padding:1rem 1.5rem;
  gap:1rem;
  overflow:hidden;
  -webkit-box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73); 
  box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73);
  
  .play {
    background: lime;
    padding: 0.5rem 1rem;
    border-radius:5px;
    width:100%;
  }
  
  @media only screen and (max-width: 768px) {
    width:80vw;
  }
`;
'use client'

import styled from "styled-components"
import { get_rooms } from "../db/room"
import { useEffect, useState } from "react"
import Loading from "../universal/Loading";
import Link from "next/link";
import Button3D from "../universal/Button";
import JoinFullIcon from '@mui/icons-material/JoinFull'

export default function RoomsComponent() {
  const [roomsList, setRoomsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRooms = async () => {
      const { rooms } = await get_rooms();
      setRoomsList(rooms)
      setLoading(false)
    }
    getRooms();
  }, [])

  return (
    <Users>
      <Con>
        {loading == false ? (
          <>
            <RoomList>
              {roomsList.map((room, idx) => (
                <RoomItem key={idx}>
                  <RoomName>{room.room.name}</RoomName>
                  <RoomButton>
                    <Button3D
                      b1={"hsl(342deg 100% 32%)"}
                      b2={"hsl(340deg 100% 47%)"}
                    >
                      { room.room.played == false && room.room.isPublic == true ? (
                        <>
                        <JoinFullIcon />
                        <Link href={`/cuser/${room.id}`}>JOIN</Link>
                        </>
                      ) : (
                        room.room.isPublic == true ? ( 
                          <Link href={`/eval/${room.id}`}>Results</Link>
                        )  : ( 
                          "Private" 
                        )
                      )}
                    </Button3D>
                  </RoomButton>
                </RoomItem>
              ))}
            </RoomList>
          </>
        ) : (
          <Loading state={loading} />
        )}
      </Con>
    </Users>
  )
}

const Users = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 50vh;
`

const Con = styled.div`
  width: 80vw;
  height: 50vh;
  overflow-y: scroll;
  padding: 1rem 0px 5rem 0px;
  position: relative;
`

const RoomList = styled.div`
  width: 100%;
`

const RoomItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #dddddd;
  padding: 12px 15px;

  &:last-of-type {
    border-bottom: 2px solid #002A22;
  }
`

const RoomName = styled.div`
  flex: 1;
`

const RoomButton = styled.div`
  margin-left: 10px;
`

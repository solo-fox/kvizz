import  { create_room } from "../../db/room"

export async function POST(req, res) {
  const body = await req.json();
  
  let nickname = body.nickname
  let isPublic = body.isPublic
  let usersnumber = body.usersnumber
  let rounds = body.rounds
  let time = body.time
  let roomName = body.roomName
  
  try {
    const { user_id, room_id } = await create_room(nickname, isPublic, usersnumber, time, rounds, roomName)
    return new Response(JSON.stringify({ payload : { user_id, room_id } }), {
      status: 200
    });
  } catch (error){
    return new Response(JSON.stringify({ payload : error}), {
      status: 400
    });
  }
}
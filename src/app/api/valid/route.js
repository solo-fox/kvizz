import  { is_user } from "../../db/user"
import  { room_exists } from "../../db/room"

export async function POST(req, res) {
  const body = await req.json();
  try{
    const room_valid = await room_exists(body.roomId)
    const user_valid = await is_user(body.roomId, body.userId)
    return new Response(JSON.stringify({ "payload" : "valid"}), {
      status: 200
    });
  } catch (e) {
    return new Response(JSON.stringify({ "payload" : e }), {
      status: 400
    });
  }
}
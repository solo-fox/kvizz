import {
  create_user
} from "../../db/user";
import {
  room_exists
} from "../../db/room"

export async function POST(req, res) {
  const body = await req.json();

  try {
    const room = await room_exists(body.roomId)
    const {
      user_id
    } = await create_user(body.roomId, body.nickname)
    return new Response(JSON.stringify({
      payload: {
        user_id
      }
    }), {
      status: 200
    });
  } catch(e) {
    return new Response(JSON.stringify({
      payload: {
        error: e
      }
    }), {
      status: 400
    });
  }
}
import {
  getGameData
} from "../../db/play"

export async function POST(req, res) {
  const body = await req.json();
  try {
    const {
      word,
      time
    } = await getGameData(body.roomId)
    return new Response(JSON.stringify({
      payload: {
        word,
        time
      }
    }), {
      status: 200
    });
  } catch(error) {
    return new Response(JSON.stringify({
      payload: {
        error
      }
    }), {
      status: 400
    });
  }
}
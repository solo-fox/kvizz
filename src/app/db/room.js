import {
  nanoid
} from 'nanoid'
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import {
  dbBroadcast,
  dbStore
} from '../firebase';
import {
  ref,
  set
} from "firebase/database";
import {
  encode
} from '@hugov/shorter-string'

export async function create_room (
  nickname,
  isPublic,
  usersnumber,
  time,
  rounds,
  roomName,
) {
  return new Promise(async (resolve, reject) => {
    let userId = nanoid();
    let room = {
      isPublic,
      usersnumber,
      time: time+7,
      rounds,
      redirect: false,
      playIsOn: false,
      word: "Dog",
      played: false,
      name: roomName
    }
    let users = [{
      id: userId,
      name: nickname,
      host: true,
      score: 0,
      onTurn: true,
      typing: false
    }]
    try {
      const docRef = await addDoc(collection(dbStore, "rooms"), {
        room,
        users
      });
      console.log("Document written with ID: ", docRef.id);
      try {
        await set(ref(dbBroadcast, docRef.id), {
          svgLines: encode("[]")
        });
        await set(ref(dbBroadcast, "timer/"+docRef.id), {
          time
        });
        console.log("Broadcast written");
        resolve({
          user_id: userId,
          room_id: docRef.id
        });
      } catch (e) {
        console.error("Error adding broadcast: ", e);
        reject(e);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      reject(e);
    }
  });
}

export function room_exists(room_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(dbStore, "rooms", room_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve()
      } else {
        reject({
          room_id
        })
      }
    }catch(e) {
      reject(e)
    }
  })
}


export async function get_rooms() {
  try {
    const roomRef = collection(dbStore,
      'rooms');
    const rooms = await getDocs(roomRef);
    const allDocs = rooms.docs.map((doc) => {
      let room = doc.data();
      room.id = doc.id;
      return room;
    });
    return {
      rooms: allDocs
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
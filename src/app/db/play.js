import {
  dbBroadcast,
  dbStore
} from '../firebase';
import {
  ref,
  set,
  child,
  get,
  update
} from "firebase/database";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import {
  encode
} from '@hugov/shorter-string';

export function sendLines(roomId, lines) {
  return new Promise(async (resolve, reject) => {
    try {
      let compressedLines = encode(lines)
      set(ref(dbBroadcast, roomId), {
        svgLines: compressedLines
      });
      resolve()
    } catch(e) {
      reject(e)
    }
  })
}

export function startGame(roomId) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(dbStore, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const roomData = docSnap.data().room;
        let users = docSnap.data().users;
        users.forEach(user => {
          if (user.onTurn == false) {
            user.typing = true
          }
        })
        updateDoc(docRef,
          {
            room: {
              ...roomData,
              playIsOn: true,
              redirect: true,
              played: true
            },
            users: users
          })
        resolve()
      } else {
        reject()
      }
    }catch(e) {
      console.log(e)
      reject(e)
    }
  })
}

export function setWord(roomId, word) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(dbStore, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const roomData = docSnap.data().room;
        updateDoc(docRef, {
          room: {
            ...roomData,
            word: word
          }
        })
        resolve()
      } else {
        reject()
      }
    }catch(e) {
      console.log(e)
      reject(e)
    }
  })
}

export function getGameData(roomId) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(dbStore, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const roomData = docSnap.data().room;
        resolve({
          word: roomData.word,
          time: roomData.time,
          playIsOn: roomData.playIsOn,
          rounds: roomData.rounds
        })
      } else {
        reject()
      }
    }catch(e) {
      console.log(e)
      reject(e)
    }
  })
}

export function evalUserScore(room_id, user_id, drawer_id, word) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(dbStore, "rooms", room_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let roomData = docSnap.data().room;
        roomData.redirect = false;
        roomData.rounds = roomData.rounds - 1
        const updates = {};
        updates[`timer/${room_id}`] = { time: roomData.time  }
        update(ref(dbBroadcast), updates);
        if (roomData.rounds <= 0) {
          resolve({
            finished: true
          })
        }
        let users = docSnap.data().users;
        let currentUserIndex = users.findIndex(obj => obj.id === user_id);
        let currentDrawerIndex = users.findIndex(obj => obj.id === drawer_id);
        if (word.toLowerCase() == roomData.word.toLowerCase()) {
          users[currentUserIndex].score += 40
          users[currentDrawerIndex].score += 140
        }
        if (currentDrawerIndex !== -1) {
          users[currentDrawerIndex].onTurn = false;
          let nextIndex = (currentDrawerIndex + 1) % users.length
          users[nextIndex].onTurn = true;
        }
        users[currentUserIndex].typing = false
        updateDoc(docRef,
          {
            room: roomData,
            users: users
          })
        resolve({
          finished: false
        })
      }
    }catch(error) {
      console.log(error)
      reject(error)
    }
  })
}

export function updateTimer(roomId) {
  return new Promise(async (resolve, reject) => {
    try {
      let dbRef = ref(dbBroadcast)
      let finished = false;
      const timerRef = await get(child(dbRef, `timer/${roomId}`))
      let time = timerRef.val().time - 1;
      if(time <= 0){
        resolve({
          time,
          finished: true
        });
      } else {
        const updates = {};
        updates[`timer/${roomId}`] = { time }
        update(ref(dbBroadcast), updates);
        resolve({
          time,
          finished: false
        })
      }
    } catch (error) {
      reject({
        error
      })
    }
  })
}
import './App.css';
import io from "socket.io-client";
import { useState } from "react"
import Chat from './Chat';
const socket = io.connect("http://localhost:8000");

function App() {

  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinroom = () => {

    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="container">
          <div className='img'>
            <img src='https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?w=740&t=st=1707838470~exp=1707839070~hmac=4dc317d11293c4ad180adff35e4b583f20124fb20abc940dbfad5bbd37384c2e' height={200} width={200} />

            <div className='header'><h1>Welcome to Chatter</h1></div>
          </div>
          <div className='joinRoom'>
            <input type="text" placeholder="User Name.." className='iput'
              onChange={(e) => { setUser(e.target.value) }} />
            <br />
            <input type="text" placeholder="Room Id.." className='iput'
              onChange={(e) => { setRoom(e.target.value) }} />
            <br />
            <button className='iputb' onClick={joinroom}>Join Room</button>
          </div>
        </div>
      ) : (

        <Chat socket={socket} username={user} room={room} />
      )}
    </div>
  );
}

export default App;

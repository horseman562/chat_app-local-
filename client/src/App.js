import React, {useEffect, useState} from 'react';
import ReactGA from 'react-ga';
import './App.css'
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("https://chat-demo12.herokuapp.com/")

function App() {

  
    ReactGA.initialize('UA-216601702-1');
    ReactGA.pageview('/')

    const [username, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false);
    
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room)
        setShowChat(true)
      }
    }


  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
        <input type="text" placeholder='John..' onChange={(event) => {
          setUserName(event.target.value)
        }} />
        <input type="text" placeholder='Room ID..' onChange={(event) => {
          setRoom(event.target.value)
        }} />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
  )
: (
      <Chat socket={socket} username={username} room={room} />
)}
    </div>
  );
}

export default App;

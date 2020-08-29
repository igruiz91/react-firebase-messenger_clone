import React, { useState, useEffect } from "react";
import {
  IconButton,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import "./App.css";
import firebase from "firebase";
import Message from "./components/Message";
import FlipMove from "react-flip-move";
import { db } from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    let nickname = ""
    const aceptedNames = ['culichuli', 'culi', 'facefriend','israel', ]
    while (!aceptedNames.includes(nickname)) {
      nickname = prompt("Please enter your nickname... tink...")
    }
    setUsername(nickname)
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); 
    db.collection("messages").add({
      username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger logo"
      />
      <h1>Facefriends chat</h1>
      <h4>Welcome {username}!</h4>
      <form className="app_form">
        <FormControl className="app_formControl">
          <InputLabel>Enter a message</InputLabel>
          <Input
            className="app_input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* Messages thenselves */}

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;

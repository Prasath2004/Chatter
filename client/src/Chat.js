import React, { useEffect, useState } from 'react'
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentmessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const message = {
                user: username,
                room: room,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", message);
            setMessageList((list) => [...list, message]);
            setCurrentmessage(" ");
        }
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {

            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className='chat-window'>
            <div className='chat-header'><p>Live Chat</p></div>
            <div className='chat-body'>
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.user ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.user}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
                <div className='chat-footer'>
                    <input
                        type='text'
                        placeholder='Enter your message...'
                        value={currentMessage}
                        onChange={(e) => {
                            setCurrentmessage(e.target.value)
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage} >&#9658;</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
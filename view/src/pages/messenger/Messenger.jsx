import './Messenger.css'
import Navbar from '../../components/Navbar.jsx';
import Conversations from '../../components/conversations/Conversations.jsx';
import Message from '../../components/message/Message.jsx';
import ChatOnline from '../../components/chatOnline/ChatOnline.jsx';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const {user} = useContext(AuthContext);
    
    useEffect(() =>{
        const getConversations = async () =>{
            try{
                const res = await axios.get('/conversations/' + user._id);
                setConversations(res.data);
            }catch (error){
                console.log(error);
            }
        }
        getConversations();
    }, [user._id]);

    // console.log(currentChat);
    useEffect(() =>{
        const getMessages = async () =>{
            try{
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data);
            }catch (error){
                console.log(error);
            }
        }
        getMessages();
    }, [currentChat, user._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        try{
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
        }catch (error){
            console.log(error);
        }
    }


    return (
        <>
            <Navbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder="Search for friends" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversations key={c._id} conversation={c} currentUser={user}/>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? <>
                        <div className="chatBoxTop">
                            {/* TODO */}
                            {messages.map((m) => (
                                <Message key={m._id} own={m.sender === user._id} message={m}/>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea onChange={(e) => setNewMessage(e.target.value)} className="chatMessageInput" placeholder="Write a message.." value={newMessage}></textarea>
                            <button className="chatSubmitButton" type="submit" onClick={handleSubmit}>Send</button>
                        </div>
                        </> : <span className="noConversationText">Open a conversation</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    );
}

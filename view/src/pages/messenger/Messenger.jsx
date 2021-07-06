import './Messenger.css'
import Navbar from '../../components/Navbar.jsx';
import Conversations from '../../components/conversations/Conversations.jsx';
import Message from '../../components/message/Message.jsx';
import ChatOnline from '../../components/chatOnline/ChatOnline.jsx';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useRef} from 'react';
import {io} from 'socket.io-client';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', data => {
            
        })
    },[]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users)=>{
            console.log(users);
        });
    }, [user]);

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

        const recieverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit('sendMessage', {
            senderId: user._id,
            recieverId: recieverId,
            text: newMessage
        });

        try{
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessage('');
        }catch (error){
            console.log(error);
        }
    };

    // useEffect(() => {
    //     socket.current.on('getMessage', data => {

    //     })
    // },[]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);


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
                            {messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message key={m._id} own={m.sender === user._id} message={m}/>
                                </div>
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

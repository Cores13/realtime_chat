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
    console.log(user);
    return (
        <>
            <Navbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder="Search for friends" />
                        {conversations.map((c) => (
                            <Conversations key={c._id} conversation={c} currentUser={user}/>
                        ))}
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own={true}/>
                            <Message />
                            <Message own={true}/>
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write a message.."></textarea>
                            <button className="chatSubmitButton" type="submit">Send</button>
                        </div>
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

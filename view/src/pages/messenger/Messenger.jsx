import './Messenger.css'
import Navbar from '../../components/Navbar.jsx';
import Conversations from '../../components/conversations/Conversations.jsx';
import Message from '../../components/message/Message.jsx';

export default function Messenger() {
    return (
        <>
            <Navbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder="Search for friends" />
                        <Conversations/>
                        <Conversations/>
                        <Conversations/>
                        <Conversations/>
                        <Conversations/>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message />
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
                        online
                    </div>
                </div>
            </div>
        </>
    );
}

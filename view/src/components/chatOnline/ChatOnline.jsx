import './ChatOnline.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function ChatOnline({onlineUsers, currentUser, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () =>{
            try{
                const res = await axios.get('/users/following/' + currentUser);
                setFriends(res.data);
            }catch (error) {
                console.log(error);
            }
        }
        getFriends();
    }, [currentUser]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f=> onlineFriends.includes(f.id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentUser}/${user._id}`);
            setCurrentChat(res.data);
            console.log(res.data);
        }catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => {
            <div className="chatOnlineFriend" onClick={handleClick}>
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={o?.profilePicture ? PF + o.profilePicture : PF + "person/noAvatar.png"} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{o?.username}</span>
            </div>
            })}
        </div>
    )
}

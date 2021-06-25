import './profile.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router';


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
        <Navbar />
        <div className="profileContainer">
            {/* <Sidebar /> */}
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        {/* eslint-disable-next-line */}
                        <img src={user.coverPicture || PF+ "person/noCover.jpg"} alt="Cover picture" className="profileCoverImg" />
                        {/* eslint-disable-next-line */}
                        <img src={user.profilePicture || PF+ "person/noAvatar.png"} alt="Profile picture" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>
        </>
    )
}

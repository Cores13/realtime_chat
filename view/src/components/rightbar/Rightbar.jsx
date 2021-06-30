import './rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Add, Remove} from '@material-ui/icons';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext.js';

export default function Rightbar({user}) {
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followed, setFollowed] = useState(currentUser.following.includes(user?.id));

    useEffect(() => {
        setFollowed(currentUser.following.includes(user?.id))
    }, [currentUser, user.id]);

    useEffect(() => {
        const getFollowing = async () => {
            try {
                const followingList = await axios.get('/users/following/' + user._id);
                setFollowings(followingList.data);
            }catch (error) {
                console.log(error);
            }
        };
        const getFollowers = async () => {
            try {
                const followersList = await axios.get('/users/followers/' + user._id);
                setFollowers(followersList.data);
            }catch (error) {
                console.log(error);
            }
        };
        getFollowing();
        getFollowers();
    },[user._id]);

    const followHandler = async () => {
        try{
            if(followed){
                await axios.put('/users/' + user._id + '/unfollow', {userId:currentUser._id});
                dispatch({type: "UNFOLLOW", payload: user._id});
            }else {
                await axios.put('/users/' + user._id + '/follow', {userId:currentUser._id});
                dispatch({type: "FOLLOW", payload: user._id});
            }
        }catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    };

    const HomeRightbar = () => {
        return (<>
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map(u => <Online key={u.id} user={u} />)}
            </ul>
        </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={followHandler}>{followed ? 'Unfollow' : 'Follow'}{followed ? <Remove/> : <Add/>} </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City: </span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From: </span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue">{user.relationship ===1 ? 'Single' : user.relationship ===2 ? 'Taken' : user.relationship ===3 ? 'Married' : 'Complicated'}</span>
                </div>
            </div>
            <hr className="rightbarHr" />
            <h4 className="rightbarFollowingTitle">Following</h4>
            <div className="rightbarFollowings">
                {followings.map(friend=>(
                    <Link to={'/profile/' + friend.username}>
                    <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + '/noAvatar.png'} alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))}        
            </div>
            <h4 className="rightbarFollowingTitle">Followers</h4>
            <div className="rightbarFollowings">
                {followers.map(friend=>(
                    <Link to={'/profile/' + friend.username}>
                    <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + '/noAvatar.png'} alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))}        
            </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}

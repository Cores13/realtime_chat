import './rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Rightbar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const getFollowing = async () => {
            try {
                const followingList = await axios.get('/users/following/' + user._id);
                setFollowing(followingList.data);
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
                {following.map(friend=>(
                    <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + '/noAvatar.png'} alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                ))}        
            </div>
            <h4 className="rightbarFollowingTitle">Followers</h4>
            <div className="rightbarFollowings">
                {followers.map(friend=>(
                    <div className="rightbarFollowing">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + '/noAvatar.png'} alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
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

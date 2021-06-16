import './rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';

export default function Rightbar({profile}) {
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
                    <span className="rightbarInfoValue">Šićki</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From: </span>
                    <span className="rightbarInfoValue">Šićki</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue">Complicated</span>
                </div>
            </div>
            <hr className="rightbarHr" />
            <h4 className="rightbarFollowingTitle">Following</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Cena</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Cena</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Cena</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Amir Kasumović</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Cena</span>
                </div>
                {/* <div className="rightbarFollowing">
                    <img src="assets/person/6.jpeg" alt="Following profile pic" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Cena</span>
                </div> */}
            </div>
            <h4 className="rightbarFollowingTitle">Followers</h4>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightbar />
            </div>
        </div>
    )
}

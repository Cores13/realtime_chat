import React from 'react';
import './navbar.css';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                <span className="logo">Stranger</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search" className="searchInput" />
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <span className="navbarLink">Home</span>
                    <span className="navbarLink">Profile</span>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <Person />
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <Chat />
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <div className="navbarIconItem">
                        <Notifications />
                        <span className="navbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} >
                    {/* eslint-disable-next-line */}
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="Profile picture" className="navbarProfilePic" />
                </Link>
            </div>
        </div>
    )
}

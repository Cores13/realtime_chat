import React from 'react';
import './navbar.css';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';

export default function Navbar() {
    return (
        <div class="navbarContainer">
            <div className="navbarLeft">
                <span className="logo">Stranger</span>
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
                {/* eslint-disable-next-line */}
                <img src="/assets/person/profile_pic.JPG" alt="Profile picture" className="navbarProfilePic" />
            </div>
        </div>
    )
}

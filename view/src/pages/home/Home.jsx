import React from 'react'
import './home.css'
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Rightbar from '../../components/rightbar/Rightbar.jsx';

export default function Home() {
    return (
        <>
        <Navbar />
        <div className="homeContainer">
            {/* <Sidebar /> */}
            <Feed />
            {/* <Rightbar /> */}
        </div>
        
        </>
    )
}

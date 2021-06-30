import React from 'react'
import './home.css'
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Rightbar from '../../components/rightbar/Rightbar.jsx';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router';

export default function Home() {
    // const [user, setUser] = useState({});
    // const username = useParams().username;

    // useEffect(() => {
    //     const fetchUser = async () =>{
    //         const res = await axios.get(`/users?username=${username}`);
    //         setUser(res.data);
    //     };
    //     fetchUser();
    // }, [username]);

    return (
        <>
        <Navbar />
        <div className="homeContainer">
            {/* <Sidebar /> */}
            {/* <Feed username={username}/> */}
            <Feed />
            {/* <Rightbar /> */}
        </div>
        
        </>
    )
}

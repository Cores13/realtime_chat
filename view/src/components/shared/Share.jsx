import './share.css'
import { MovieFilter, Photo, LocalOffer, Room, EmojiEmotions } from '@material-ui/icons';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import {useRef} from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(photo){
            const data = new FormData();
            const photoname = Date.now() + photo.name;
            data.append('photo', photo);
            data.append('name', photoname);
            newPost.img = photoname;
            try {
                await axios.post('/uploadphoto', data);
            }catch (error) {
                console.log(error);
            }
        }else if(video){
            const data = new FormData();
            const videoname = Date.now() + video.name;
            data.append('video', video);
            data.append('name', videoname);
            newPost.img = videoname;
            try {
                await axios.post('/uploadvideo', data);
            }catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post('/posts', newPost);
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="Share profile pic"/>
                    <input placeholder="Write something awesome!" className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler} >
                    <div className="shareOptions">
                        <label htmlFor="video" className="shareOption">
                            <MovieFilter className="shareIcon" />
                            <span className="shareOptionText">Video</span>
                            <input style={{display: "none"}} type="file" id="video" accept=".mp4" onChange={(e)=>setVideo(e.target.files[0])}/>
                        </label>
                        <label htmlFor="photo" className="shareOption">
                            <Photo className="shareIcon" />
                            <span className="shareOptionText">Photo</span>
                            <input style={{display: "none"}} type="file" id="photo" accept=".png,.jpeg,.jpg" onChange={(e)=>setPhoto(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <LocalOffer className="shareIcon" id="tag"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption" >
                            <Room className="shareIcon" id="location" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption" >
                            <EmojiEmotions className="shareIcon" id="emoji" />
                            <span className="shareOptionText">Emoji</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton bg-gradient2">Share</button>
                </form>
            </div>
        </div>
    )
}

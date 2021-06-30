import './share.css'
import { MovieFilter, Photo, LocalOffer, Room, EmojiEmotions } from '@material-ui/icons';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import {useRef} from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
const FormData = require('form-data');

export default function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const [file, setFile] = useState(null);
    var imgCount = 0;

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: {
                type: String
            }
        };
        if(file){
            const data = new FormData();
            const fileName = imgCount + file.name;
            imgCount++;
            data.append('file', file);
            data.append('name', fileName);
            newPost.img = fileName;
            try {
                await axios.post('/upload', data);
            }catch (error) {
                console.log(error);
            }
        };
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
                {/* <form className="shareBottom" > */}
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <Photo className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg,.mp4" onChange={(e)=>setFile(e.target.files[0])}/>
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

import './Message.css'
import {format} from 'timeago.js';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function Message({own, message}) {

    useEffect(() => {

    }, []);

    return (
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/random-stickers-1/23.png?ef2e3aa79b8296988bd04a93c62c210c&d=200x200" alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

import './post.css';
import {MoreVert, Favorite} from '@material-ui/icons';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLike] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`users/${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, []);

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1);
        setIsLike(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* eslint-disable-next-line */}
                        <img src={user.profilePicture || PF+ "person/noAvatar.png"} alt="Post profile picture" className="postProfileImg" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {/* eslint-disable-next-line */}
                    <img src={PF+post.img} alt="Post picture" className="postImg" />
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Favorite className={`likeIcon ${isLiked ? "liked" : " "}`} onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

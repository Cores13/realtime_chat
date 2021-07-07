import './post.css';
import {MoreVert, Favorite} from '@material-ui/icons';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext.js';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLike] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put('/posts/'+post._id+'/like', {userId: currentUser._id})
            setLike(isLiked ? like-1 : like+1);
            setIsLike(!isLiked);
        }catch (error) {

        }
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            {/* eslint-disable-next-line */}
                            <img src={user.profilePicture ? PF + user.profilePicture : PF+ "person/noAvatar.png"} alt="Post profile picture" className="postProfileImg" />
                            <span className="postUsername">{user.username}</span>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </Link>
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

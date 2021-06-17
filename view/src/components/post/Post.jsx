import './post.css';
import {MoreVert, Favorite} from '@material-ui/icons';
import {Users} from '../../dummyData';
import {useState} from 'react';

export default function Post({post}) {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLike] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                        <img src={PF + Users.filter(u => u.id === post.userId)[0].profilePicture} alt="Post profile picture" className="postProfileImg" />
                        <span className="postUsername">{Users.filter(u => u.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {/* eslint-disable-next-line */}
                    <img src={PF + post.photo} alt="Post picture" className="postImg" />
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <FavoriteBorder className="likeIcon liked"/> */}
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

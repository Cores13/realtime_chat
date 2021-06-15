import './post.css';
import {MoreVert, Favorite, FavoriteBorder} from '@material-ui/icons';

export default function Post() {
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* eslint-disable-next-line */}
                        <img src="/assets/person/ivana.png" alt="Post profile picture" className="postProfileImg" />
                        <span className="postUsername">Ivana Veselinović</span>
                        <span className="postDate">1m ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">Hey! This guy makes my life better! :)</span>
                    {/* eslint-disable-next-line */}
                    <img src="/assets/person/profile_pic.JPG" alt="Post picture" className="postImg" />
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <FavoriteBorder className="likeIcon liked"/> */}
                        <Favorite className="likeIcon liked"/>
                        <span className="postLikeCounter">32 people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

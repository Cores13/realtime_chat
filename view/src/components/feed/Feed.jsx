import './feed.css';
import Share from '../shared/Share';
import Post from '../post/Post';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () =>{
            const res = await axios.get('posts/timeline/60c34338613a80037d2e9582');
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    return (
        <>
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((p) =>(
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
        </>
    )
}

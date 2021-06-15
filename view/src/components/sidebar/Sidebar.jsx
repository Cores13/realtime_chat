import './sidebar.css';
import { RssFeed, Chat, VideoLibrary, Stars } from '@material-ui/icons';
import {Users} from '../../dummyData';
import Friend from '../friend/Friend';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibrary className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Stars className="sidebarIcon" />
                        <span className="sidebarListItemText">Most popular</span>
                    </li>
                </ul>
                {/* <button className="sidebarButton">Show More</button> */}
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(u=> <Friend key={u.id} user={u} />)}
                </ul>
            </div>
        </div>
    )
}

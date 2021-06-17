import './profile.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
        <Navbar />
        <div className="profileContainer">
            {/* <Sidebar /> */}
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        {/* eslint-disable-next-line */}
                        <img src={`${PF}post/3.jpeg`} alt="Cover picture" className="profileCoverImg" />
                        {/* eslint-disable-next-line */}
                        <img src={`${PF}person/7.jpeg`} alt="Profile picture" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Dzix Dzinic</h4>
                        <span className="profileInfoDesc">Eto Dzixaaaa!</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <Rightbar profile/>
                </div>
            </div>
        </div>
        </>
    )
}

import './profile.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`/users/${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    return (
        <>
        <Navbar />
        <div className="profileContainer">
            {/* <Sidebar /> */}
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        {/* eslint-disable-next-line */}
                        <img src={`${PF}post/3.jpeg` || PF+ "person/noCover.jpg"} alt="Cover picture" className="profileCoverImg" />
                        {/* eslint-disable-next-line */}
                        <img src={`${PF}person/7.jpeg` || PF+ "person/noAvatar.png"} alt="Profile picture" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Dzix Dzinic</h4>
                        <span className="profileInfoDesc">Eto Dzixaaaa!</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username="adi"/>
                    <Rightbar profile/>
                </div>
            </div>
        </div>
        </>
    )
}

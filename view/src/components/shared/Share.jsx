import './share.css'
import { MovieFilter, Photo, LocalOffer, Room, EmojiEmotions } from '@material-ui/icons';

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/profile_pic.JPG" alt="Share profile pic"/>
                    <input placeholder="Say something awesome!" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <MovieFilter className="shareIcon" />
                            <span className="shareOptionText">Video</span>
                        </div>
                        <div className="shareOption">
                            <Photo className="shareIcon" />
                            <span className="shareOptionText">Photo</span>
                        </div>
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
                    <button className="shareButton bg-gradient2">Share</button>
                </div>
            </div>
        </div>
    )
}

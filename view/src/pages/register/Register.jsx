import './register.css';

export default function Register() {
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Stranger</h3>
                    <span className="registerDesc">Don't feel lonely. You can always meet a stranger here!</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input placeholder="Username" className="registerInput" />
                        <input placeholder="Email" className="registerInput" />
                        <input placeholder="Password" className="registerInput" />
                        <input placeholder="Confirm password" className="registerInput" />
                        <button className="registerButton">Sign Up</button>
                        {/* <span className="registerForgot">Forgot Password?</span> */}
                        <button className="registerRegisterButton">Log into existing account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

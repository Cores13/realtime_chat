import './register.css';
import {Link}from 'react-router-dom';
import {useContext, useRef} from 'react';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {useHistory} from 'react-router'


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const history= useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordConfirm.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match!");
        }else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post('/auth/register', user);
                history.push('/login');
            }catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Stranger</h3>
                    <span className="registerDesc">Don't feel lonely. You can always meet a stranger here!</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" ref={username} className="registerInput" required />
                        <input type="email" placeholder="Email" ref={email} className="registerInput" required />
                        <input type="password" placeholder="Password" ref={password} className="registerInput" minLength="8" required />
                        <input type="password" placeholder="Confirm password" ref={passwordConfirm} className="registerInput" minLength="8" required />
                        <button className="registerButton" type="submit">Sign Up</button>
                        {/* <span className="registerForgot">Forgot Password?</span> */}
                        <Link to="/login" className="registerRegisterButton">Log into existing account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

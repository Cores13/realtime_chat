import './login.css';
import {useContext, useRef} from 'react';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';

export default function Login() {
    const email = useRef();
    const password = useRef();

    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };

    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Stranger</h3>
                    <span className="loginDesc">Don't feel lonely. You can always meet a stranger here!</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox" onSubmit={handleClick}>
                        <form className="loginForm" onSubmit={handleClick}>
                            <input type="email" placeholder="Email" className="loginInput" ref={email} required/>
                            <input type="password" placeholder="Password" className="loginInput" ref={password} required minLength="8"/>
                            <button className="loginButton">{isFetching ? <CircularProgress /> : 'Log In'}</button>
                            <span className="loginForgot">Forgot Password?</span>
                        </form>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
